import React, { useEffect, useState } from 'react';
import "./teachercomponents.css"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MAX_ITEMS_LIMIT = 15; // Maximum number of items for the test

const CreateQuiz = () => {
    const [numItems, setNumItems] = useState('');
    const [quizItems, setQuizItems] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [batches, setBatches] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBatches = async () => {
            const batchesRef = collection(db, 'batches');
            const batchesSnapshot = await getDocs(batchesRef);
            const batchesList = [];
            batchesSnapshot.forEach((doc) => {
                batchesList.push({ id: doc.id, ...doc.data() });
            });
            setBatches(batchesList);
        };

        fetchBatches();
    }, []);

    const handleInputChange = (index, key, value) => {
        const updatedItems = [...quizItems];
        updatedItems[index][key] = value;
        setQuizItems(updatedItems);
    };

    const handleNumItemsChange = (e) => {
        const newNumItems = parseInt(e.target.value);
        if (newNumItems <= MAX_ITEMS_LIMIT) {
            setNumItems(newNumItems);
            setQuizItems(Array.from({ length: newNumItems }, () => ({ question: '', answer: '' })));
        } else {
            // Handle exceeding the limit here
            // For example: alert(`Maximum limit for items is ${MAX_ITEMS_LIMIT}`);
        }
    };

    // Function to handle the creation of test and batch update
    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        try {
            const quizRef = collection(db, 'quizzes');
            const quizDoc = await addDoc(quizRef, {
                title: quizTitle,
                items: quizItems
            });

            console.log("Test created with ID: ", quizDoc.id);

            const batchRef = doc(db, 'batches', selectedBatch);

            const batchSnap = await getDoc(batchRef);
            const batchData = batchSnap.data();

            const updatedQuizzes = batchData.quizzes ? [...batchData.quizzes, quizDoc.id] : [quizDoc.id];
            await updateDoc(batchRef, {
                quizzes: updatedQuizzes
            });

            // Reset fields after successful creation and update
            setQuizTitle('');
            setSelectedBatch('');
            navigate('/teacher/quiz')
        } catch (error) {
            console.error("Error creating test: ", error);
        }
    };

    // ... (Other functions and render methods)
    const renderInputFields = () => {
        if (numItems > 0 && numItems <= MAX_ITEMS_LIMIT) {
            return quizItems.map((item, index) => (
                <div className='form-input pages-row' key={index}>
                    <div className='pages-col-9'>
                        <div className='form-input'>
                            <label> Question {index + 1}:</label>
                            <input
                                type="text"
                                value={item.question}
                                onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='pages-col-3'>
                        <div className='form-input'>
                            <label>Answer {index + 1}: </label>
                            <input
                                type="text"
                                value={item.answer}
                                onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ));
        }
        return null;
    };

    return (
        <div>
            <div className='db-header-holder'>
                <Link to='/teacher/quiz' className="db-links"><ArrowBackIosIcon /><h3 className="db-title">Quiz List</h3></Link>
                <h3 className='db-title'>Create Quiz</h3>
            </div>
            <div className='create-test-container'>
                <div className='pages-row'>
                    <div className='pages-col-6'>
                        <div className='form-input'>
                            <label>
                                Quiz Title:
                                <input
                                    type="text"
                                    value={quizTitle}
                                    onChange={(e) => setQuizTitle(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className='form-input'>
                            <label>
                                Number of Items:
                                <input
                                    type="number"
                                    min="0"
                                    placeholder='15 is limit'
                                    max={MAX_ITEMS_LIMIT}
                                    value={numItems}
                                    onChange={handleNumItemsChange}
                                />
                            </label>
                        </div>

                    </div>
                    <div className='pages-col-6'>
                        <div className='form-input'>
                            <label>
                                Select Batch:
                                <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                                    <option value="">Select a batch</option>
                                    {batches.map((batch) => (
                                        <option key={batch.id} value={batch.id}>
                                            {batch.batchName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                </div>
                <div className='pages-col-12'>
                    <div className='create-test-holder'>
                        {renderInputFields()}
                    </div>
                </div>
                <div >
                    <button className='form-button' onClick={handleCreateQuiz}>Save Quiz</button>
                </div>
            </div>
        </div>

    );
};

export default CreateQuiz;
