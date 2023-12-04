import React, { useState, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import classNames from 'classnames';

const Homework = () => {
    const { currentUser } = useContext(AuthContext);
    const [batchHomeworks, setBatchHomeworks] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [answerText, setAnswerText] = useState('');
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

    const checkUserAnswer = async () => {
        if (!currentUser || !selectedHomework) {
            return;
        }

        try {
            const answersCollectionRef = collection(db, 'homeworkAnswers'); // Change 'answers' to your desired collection name
            const q = query(answersCollectionRef,
                where('studentId', '==', currentUser.uid),
                where('homeworkId', '==', selectedHomework.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setHasAnswered(true);
            }
        } catch (error) {
            console.error('Error checking user answer: ', error);
        }
    };

    useEffect(() => {
        if (currentUser && selectedHomework) {
            checkUserAnswer();
        }
    }, [currentUser, selectedHomework]);

    // Function to fetch batches' homework for a student
    const fetchBatchesHomeworkForStudent = async (studentId) => {
        const batchesRef = collection(db, 'batches');
        const batchesSnapshot = await getDocs(batchesRef);
        const batchesList = [];

        batchesSnapshot.forEach((doc) => {
            const batch = { id: doc.id, ...doc.data() };
            if (batch.students.includes(studentId)) {
                batchesList.push(batch);
            }
        });

        // Fetch homework for each batch
        const homeworks = [];
        for (const batch of batchesList) {
            const batchHomeworksRef = doc(db, 'batches', batch.id);
            const batchHomeworksSnapshot = await getDoc(batchHomeworksRef);

            if (batchHomeworksSnapshot.exists()) {
                const batchData = batchHomeworksSnapshot.data();
                if (batchData && batchData.homeworks) {
                    for (const homeworkId of batchData.homeworks) {
                        const homeworkRef = doc(db, 'homeworks', homeworkId);
                        const homeworkSnapshot = await getDoc(homeworkRef);

                        if (homeworkSnapshot.exists()) {
                            const homeworkData = homeworkSnapshot.data();
                            const startDate = new Date(homeworkData.startTime);

                            // Check if the homework exists in the answered collection
                            const answered = await checkIfHomeworkAnswered(homeworkId);
                            homeworkData.hasAnswered = answered;

                            if (startDate > new Date()) {
                                // If start date is in the future, disable this homework
                                homeworkData.disabled = true;
                            } else {
                                homeworkData.disabled = false;
                            }
                            homeworks.push({ id: homeworkSnapshot.id, ...homeworkData });
                        }
                    }
                }
            }
        }

        setBatchHomeworks(homeworks);
    };

    const checkIfHomeworkAnswered = async (homeworkId) => {
        try {
            if (!currentUser) return false;

            const answersCollectionRef = collection(db, 'homeworkAnswers');
            const q = query(answersCollectionRef,
                where('studentId', '==', currentUser.uid),
                where('homeworkId', '==', homeworkId));
            const querySnapshot = await getDocs(q);

            return !querySnapshot.empty;
        } catch (error) {
            console.error('Error checking if homework answered: ', error);
            return false;
        }
    };

    useEffect(() => {
        if (currentUser) {
            const studentId = currentUser.uid;
            fetchBatchesHomeworkForStudent(studentId);
        }
    }, [currentUser]);


    const closeHomeworkDetails = () => {
        setSelectedHomework(null);
        setAnswerText('');
        setFile(null);
        setHasAnswered(false); // Reset hasAnswered state when closing homework details
    };

    const handleAnswerTextChange = (event) => {
        setAnswerText(event.target.value);
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const submitAnswer = async () => {
        if (!currentUser || !selectedHomework || !answerText) {
            // Handle the case if any of the required fields are missing
            return;
        }

        try {
            let downloadURL = null;

            if (file) {
                const date = new Date().getTime();
                const storageRef = ref(storage, `${currentUser.displayName + date}`); // Change 'uploads' to your desired folder name
                await uploadBytesResumable(storageRef, file);
                downloadURL = await getDownloadURL(storageRef);
                // Upload the file to Firebase Storage
            }

            const answersCollectionRef = collection(db, 'homeworkAnswers'); // Change 'answers' to your desired collection name
            const newAnswer = {
                studentId: currentUser.uid,
                homeworkId: selectedHomework.id,
                answerText,
                fileURL: downloadURL,
                // Add other necessary fields as required
            };

            const docRef = await addDoc(answersCollectionRef, newAnswer);
            console.log('Answer submitted with ID: ', docRef.id);

            // Clear the input fields after submission
            setAnswerText('');
            setFile(null);
            setSubmitted(true);
            setSelectedHomework(null);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting answer: ', error);
        }
    };

    const handleHomeworkClick = (homework) => {
        setSelectedHomework(homework);
        setHasAnswered(false);

    };


    const renderSelectedHomeworkContent = () => {
        if (!selectedHomework) return null;

        const startDate = new Date(selectedHomework.startTime);

        return (
            <div className='selected-test-details'>
                <div className='selected-test-holder'>
                    <div className='db-header-holder'>
                        <h3 style={{ marginBottom: "0" }} className='db-sub-title'>{selectedHomework.title}</h3>
                        <CloseIcon onClick={closeHomeworkDetails} />
                    </div>
                    {startDate > new Date() ? (
                        <>
                            <p>The details will be available once the homework starts.</p>
                            <p>Starts At: {selectedHomework.startTime}</p>
                        </>
                    ) : (
                        <>
                            <p>Points: {selectedHomework.points}</p>
                            <p>Starts At: {selectedHomework.startTime}</p>
                            <p>Ends In: {selectedHomework.endTime}</p>
                            <p>Description: {selectedHomework.description}</p>
                            <div className='form-input'>
                                <textarea
                                    rows="5"
                                    value={answerText}
                                    onChange={handleAnswerTextChange}
                                    placeholder='Type your answer here...'
                                    disabled={submitted || hasAnswered}
                                />
                            </div>
                            <input type='file' onChange={handleFileChange} disabled={submitted || hasAnswered} />
                            <button
                                className={hasAnswered || submitted ? 'form-button disabled-btn' : 'form-button'}
                                onClick={submitAnswer}
                                disabled={submitted || hasAnswered}>
                                {hasAnswered ? 'Answered' : 'Submit Answer'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };



    return (
        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6'>
                    <div className='test-list-holder'>
                        {batchHomeworks.map((homework) => (
                            <nav
                                key={homework.id}
                                className={classNames(
                                    '',
                                    { 'active': selectedHomework && selectedHomework.id === homework.id },
                                    { 'answered': homework.hasAnswered }
                                )}
                                onClick={() => handleHomeworkClick(homework)}
                            >
                                <p>Title: {homework.title}</p>
                                {homework.hasAnswered && <p>Answered</p>}
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6'>
                    {renderSelectedHomeworkContent()}
                </div>
            </div>
        </div>
    )
};

export default Homework;