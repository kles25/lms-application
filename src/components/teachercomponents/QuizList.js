import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    // Fetch all tests from Firestore collection
    const fetchQuiz = async () => {
        try {
            const quizzesRef = collection(db, 'quizzes'); // Replace 'dynamic_tests' with your collection name
            const quizzesSnapshot = await getDocs(quizzesRef);
            const quizzesList = [];
            quizzesSnapshot.forEach((doc) => {
                quizzesList.push({ id: doc.id, ...doc.data() });
            });
            setQuizzes(quizzesList);
        } catch (error) {
            console.error('Error fetching quizzes: ', error);
        }
    };

    useEffect(() => {
        // Fetch tests when the component mounts
        fetchQuiz();
    }, []);

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz); // Update selectedQuiz state with the clicked test
    };

    return (

        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {quizzes.map((quiz) => (
                            <nav
                                key={quiz.id}
                                className={selectedQuiz && selectedQuiz.id === quiz.id ? 'active' : ''}
                                onClick={() => handleQuizClick(quiz)}>
                                <p className='title'>{quiz.title}</p>
                                <p className='items'>Items: {quiz.items.length}</p>
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedQuiz && (
                        <div className='selected-test-details'>
                            <div className='selected-test-holder'>
                                <h3>{selectedQuiz.title}</h3>
                                {selectedQuiz.items.map((item, index) => (
                                    <div key={index}>
                                        <p>Question: {item.question}</p>
                                        <p>Answer: {item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>

    );
};

export default QuizList;
