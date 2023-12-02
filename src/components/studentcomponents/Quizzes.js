import React, { useState, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

const Quizzes = () => {
    const { currentUser } = useContext(AuthContext);
    const [batchQuizzes, setBatchQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [quizStatus, setQuizStatus] = useState([]);

    useEffect(() => {
        const checkUserAnswer = async () => {
            if (!currentUser || !selectedQuiz) {
                return;
            }

            try {
                const answersCollectionRef = collection(db, 'quizAnswers');
                const q = query(answersCollectionRef,
                    where('studentId', '==', currentUser.uid),
                    where('quizId', '==', selectedQuiz.id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setHasAnswered(true);
                }
            } catch (error) {
                console.error('Error checking user answer: ', error);
            }
        };

        if (currentUser && selectedQuiz) {
            checkUserAnswer();
        }
    }, [currentUser, selectedQuiz]);

    // Function to fetch quizzes for the student
    const fetchBatchesQuizzesForStudent = async (studentId) => {
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
        const quizzes = [];
        for (const batch of batchesList) {
            const batchQuizzesRef = doc(db, 'batches', batch.id);
            const batchQuizzesSnapshot = await getDoc(batchQuizzesRef);

            if (batchQuizzesSnapshot.exists()) {
                const batchData = batchQuizzesSnapshot.data();
                if (batchData && batchData.quizzes) {
                    for (const quizId of batchData.quizzes) {
                        const quizRef = doc(db, 'quizzes', quizId);
                        const quizSnapshot = await getDoc(quizRef);

                        if (quizSnapshot.exists()) {
                            const quizData = { id: quizSnapshot.id, ...quizSnapshot.data() };
                            const answered = await checkIfQuizAnswered(quizData.id);
                            quizData.hasAnswered = answered;
                            quizzes.push(quizData);
                        }
                    }
                }
            }
        }

        setBatchQuizzes(quizzes);
    };

    useEffect(() => {
        if (currentUser) {
            const studentId = currentUser.uid;
            fetchBatchesQuizzesForStudent(studentId);
        }
    }, [currentUser]);

    const checkIfQuizAnswered = async (quizId) => {
        try {
            if (!currentUser) return false;

            const answersCollectionRef = collection(db, 'quizAnswers');
            const q = query(answersCollectionRef,
                where('studentId', '==', currentUser.uid),
                where('quizId', '==', quizId));
            const querySnapshot = await getDocs(q);

            return !querySnapshot.empty;
        } catch (error) {
            console.error('Error checking if quiz answered: ', error);
            return false;
        }
    };

    useEffect(() => {
        const checkUserAnswer = async () => {
            if (!currentUser || !selectedQuiz) {
                return;
            }

            try {
                const answered = await checkIfQuizAnswered(selectedQuiz.id);
                setHasAnswered(answered);
            } catch (error) {
                console.error('Error checking user answer: ', error);
            }
        };

        if (currentUser && selectedQuiz) {
            checkUserAnswer();
        }
    }, [currentUser, selectedQuiz]);

    const handleQuizClick = (quiz) => {
        if (!quiz.hasAnswered) {
            // Proceed with handling the click functionality only if the quiz hasn't been answered
            setSelectedQuiz(quiz);
            setUserAnswers(new Array(quiz.items.length).fill(''));
            setSubmitted(false);
            setHasAnswered(false);

            // Check if the user has already answered this quiz
            const answeredQuiz = quizStatus.find(qs => qs.quizId === quiz.id);
            if (answeredQuiz) {
                setSubmitted(answeredQuiz.submitted);
                setHasAnswered(answeredQuiz.hasAnswered);
            }
        }
    };

    const handleAnswerChange = (index, answer) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[index] = answer;
        setUserAnswers(updatedUserAnswers);
    };

    const submitAnswers = async () => {
        if (!currentUser || !selectedQuiz || !userAnswers.every(answer => answer !== '')) {
            // Handle the case if any of the required fields are missing
            return;
        }

        try {
            const quizAnswersCollectionRef = collection(db, 'quizAnswers');
            const newAnswer = {
                studentId: currentUser.uid,
                quizId: selectedQuiz.id,
                answers: userAnswers,
                // Add other necessary fields as required
            };

            if (hasAnswered) {
                // If user has already answered, do not submit again
                setSubmitted(true);
                return;
            }

            const correctAnswers = selectedQuiz.items.map((item, index) => item.answer.toLowerCase());
            const score = userAnswers.reduce((acc, answer, index) => {
                if (answer.toLowerCase() === correctAnswers[index]) {
                    return acc + 1; // Increment score for correct answer
                }
                return acc;
            }, 0);

            newAnswer.score = score;

            const docRef = await addDoc(quizAnswersCollectionRef, newAnswer);
            console.log('Answers submitted with ID: ', docRef.id);

            const updatedStatus = quizStatus.map(quiz => {
                if (quiz.quizId === selectedQuiz.id) {
                    return { ...quiz, submitted: true };
                }
                return quiz;
            });

            setQuizStatus(updatedStatus);

            // Clear the input fields after submission
            setUserAnswers([]);
            setSubmitted(true);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting answers: ', error);
        }
    };

    const closeHomeworkDetails = () => {
        setSelectedQuiz(null);
    };



    return (
        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {batchQuizzes.map((quiz) => (
                            <nav
                                key={quiz.id}
                                className={classNames(
                                    { 'active': selectedQuiz && selectedQuiz.id === quiz.id },
                                    { 'answered': quiz.hasAnswered }
                                )}
                                onClick={() => handleQuizClick(quiz)}
                            // Consider removing the disabled attribute as it might not work with <nav>
                            >
                                <p>Title: {quiz.title}</p>
                                {quiz.hasAnswered && <p>Answered</p>}
                            </nav>

                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedQuiz && (
                        <div className='selected-test-details'>
                            <div className='selected-test-holder' style={{ height: "78.5vh", overflowY: "scroll" }}>
                                <div className='db-header-holder'>
                                    <h3 style={{ marginBottom: "0" }} className='db-sub-title'>{selectedQuiz.title}</h3>
                                    <CloseIcon onClick={closeHomeworkDetails} />
                                </div>

                                <p>Number of Items: {selectedQuiz.items ? selectedQuiz.items.length : 0}</p>
                                {selectedQuiz.items && selectedQuiz.items.map((item, index) => (
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

export default Quizzes;