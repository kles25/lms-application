import React, { useState, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

const Tests = () => {
    const { currentUser } = useContext(AuthContext);
    const [batchTests, setBatchTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [testStatus, setTestStatus] = useState([]);

    useEffect(() => {
        const checkUserAnswer = async () => {
            if (!currentUser || !selectedTest) {
                return;
            }

            try {
                const answersCollectionRef = collection(db, 'testAnswers');
                const q = query(answersCollectionRef,
                    where('studentId', '==', currentUser.uid),
                    where('testId', '==', selectedTest.id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setHasAnswered(true);
                }
            } catch (error) {
                console.error('Error checking user answer: ', error);
            }
        };

        if (currentUser && selectedTest) {
            checkUserAnswer();
        }
    }, [currentUser, selectedTest]);

    // Function to fetch tests for the student
    const fetchBatchesTestsForStudent = async (studentId) => {
        const batchesRef = collection(db, 'batches');
        const batchesSnapshot = await getDocs(batchesRef);
        const batchesList = [];

        batchesSnapshot.forEach((doc) => {
            const batch = { id: doc.id, ...doc.data() };
            if (batch.students.includes(studentId)) {
                batchesList.push(batch);
            }
        });

        // Fetch quizzes for each batch
        const tests = [];
        for (const batch of batchesList) {
            const batchTestsRef = doc(db, 'batches', batch.id);
            const batchTestsSnapshot = await getDoc(batchTestsRef);

            if (batchTestsSnapshot.exists()) {
                const batchData = batchTestsSnapshot.data();
                if (batchData && batchData.tests) {
                    for (const testId of batchData.tests) {
                        const testRef = doc(db, 'tests', testId);
                        const testSnapshot = await getDoc(testRef);

                        if (testSnapshot.exists()) {
                            const testWithId = { id: testSnapshot.id, ...testSnapshot.data() };
                            const answered = await checkIfTestAnswered(testWithId.id);
                            testWithId.hasAnswered = answered;
                            tests.push(testWithId);
                        }
                    }
                }
            }
        }

        setBatchTests(tests);
    };

    useEffect(() => {
        if (currentUser) {
            const studentId = currentUser.uid;
            fetchBatchesTestsForStudent(studentId);
        }
    }, [currentUser]);

    const checkIfTestAnswered = async (testId) => {
        try {
            if (!currentUser) return false;

            const answersCollectionRef = collection(db, 'testAnswers');
            const q = query(answersCollectionRef,
                where('studentId', '==', currentUser.uid),
                where('testId', '==', testId));
            const querySnapshot = await getDocs(q);

            return !querySnapshot.empty;
        } catch (error) {
            console.error('Error checking if test answered: ', error);
            return false;
        }
    };

    useEffect(() => {
        const checkUserAnswer = async () => {
            if (!currentUser || !selectedTest) {
                return;
            }

            try {
                const answered = await checkIfTestAnswered(selectedTest.id);
                setHasAnswered(answered);
            } catch (error) {
                console.error('Error checking user answer: ', error);
            }
        };

        if (currentUser && selectedTest) {
            checkUserAnswer();
        }
    }, [currentUser, selectedTest]);

    const handleTestClick = (test) => {
        setSelectedTest(test);
        setUserAnswers(new Array(test.items.length).fill(''));
        setSubmitted(false);
        setHasAnswered(false);

        const answeredTest = testStatus.find(ts => ts.testId === test.id);
        if (answeredTest) {
            setSubmitted(answeredTest.submitted);
            setHasAnswered(answeredTest.hasAnswered);
        }
    };

    const handleAnswerChange = (index, answer) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[index] = answer;
        setUserAnswers(updatedUserAnswers);
    };

    const submitAnswers = async () => {
        if (!currentUser || !selectedTest || !userAnswers.every(answer => answer !== '')) {
            return;
        }

        try {
            const testAnswersCollectionRef = collection(db, 'testAnswers');
            const newAnswer = {
                studentId: currentUser.uid,
                testId: selectedTest.id,
                answers: userAnswers,
                // Other necessary fields
            };

            if (hasAnswered) {
                setSubmitted(true);
                return;
            }

            const correctAnswers = selectedTest.items.map((item, index) => item.answer.toLowerCase());
            const score = userAnswers.reduce((acc, answer, index) => {
                if (answer.toLowerCase() === correctAnswers[index]) {
                    return acc + 1;
                }
                return acc;
            }, 0);

            newAnswer.score = score;

            const docRef = await addDoc(testAnswersCollectionRef, newAnswer);
            console.log('Answers submitted with ID: ', docRef.id);

            const updatedStatus = testStatus.map(test => {
                if (test.testId === selectedTest.id) {
                    return { ...test, submitted: true };
                }
                return test;
            });

            setTestStatus(updatedStatus);

            setUserAnswers([]);
            setSubmitted(true);
            setHasAnswered(true);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting answers: ', error);
        }
    };

    const closeTestDetails = () => {
        setSelectedTest(null);
    };

    return (
        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {batchTests.map((test) => (
                            <nav
                                key={test.id}
                                className={classNames(
                                    { 'active': selectedTest && selectedTest.id === test.id },
                                    { 'answered': test.hasAnswered }
                                )}
                                onClick={() => handleTestClick(test)}>
                                <p className='title'>{test.title}</p>
                                {test.hasAnswered && <p>Answered</p>}
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedTest && (
                        <div className='selected-test-details'>
                            <div className='selected-test-holder' style={{ height: "78.5vh", overflowY: "scroll" }}>
                                <div className='db-header-holder'>
                                    <h3 style={{ marginBottom: "0" }} className='db-sub-title'>{selectedTest.title}</h3>
                                    <CloseIcon onClick={closeTestDetails} />
                                </div>

                                <p>Number of Items: {selectedTest.items ? selectedTest.items.length : 0}</p>
                                {selectedTest.items && selectedTest.items.map((item, index) => (
                                    <div className='form-input' key={index}>
                                        <label>Question: {item.question}</label>
                                        <input
                                            type="text"
                                            value={userAnswers[index]}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            placeholder="Your Answer"
                                            disabled={submitted || hasAnswered}
                                        />
                                    </div>
                                ))}
                                <button className={hasAnswered || submitted ? 'form-button answered ' : 'form-button'}
                                    onClick={submitAnswers} disabled={submitted || hasAnswered}>
                                    {hasAnswered ? 'Answered' : (submitted ? 'Submitted' : 'Submit Answers')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tests;
