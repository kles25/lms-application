import React, { useEffect, useState } from 'react';
import "./teachercomponents.css"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MAX_ITEMS_LIMIT = 30; // Maximum number of items for the test

const CreateTest = () => {
    const [numItems, setNumItems] = useState('');
    const [testItems, setTestItems] = useState([]);
    const [testTitle, setTestTitle] = useState('');
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
        const updatedItems = [...testItems];
        updatedItems[index][key] = value;
        setTestItems(updatedItems);
    };

    const handleNumItemsChange = (e) => {
        const newNumItems = parseInt(e.target.value);
        if (newNumItems <= MAX_ITEMS_LIMIT) {
            setNumItems(newNumItems);
            setTestItems(Array.from({ length: newNumItems }, () => ({ question: '', answer: '' })));
        } else {
            // Handle exceeding the limit here
            // For example: alert(`Maximum limit for items is ${MAX_ITEMS_LIMIT}`);
        }
    };

    // Function to handle the creation of test and batch update
    const handleCreateTest = async (e) => {
        e.preventDefault();
        try {
            const testRef = collection(db, 'tests');
            const testDoc = await addDoc(testRef, {
                title: testTitle,
                items: testItems
            });

            console.log("Test created with ID: ", testDoc.id);

            const batchRef = doc(db, 'batches', selectedBatch);

            const batchSnap = await getDoc(batchRef);
            const batchData = batchSnap.data();

            const updatedTests = batchData.tests ? [...batchData.tests, testDoc.id] : [testDoc.id];
            await updateDoc(batchRef, {
                tests: updatedTests
            });

            // Reset fields after successful creation and update
            setTestTitle('');
            setSelectedBatch('');
            navigate('/teacher/test')
        } catch (error) {
            console.error("Error creating test: ", error);
        }
    };

    // ... (Other functions and render methods)
    const renderInputFields = () => {
        if (numItems > 0 && numItems <= MAX_ITEMS_LIMIT) {
            return testItems.map((item, index) => (
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
                <Link to='/teacher/test' className="db-links"><ArrowBackIosIcon /><h3 className="db-title">Test List</h3></Link>
                <h3 className='db-title'>Create Test</h3>
            </div>
            <div className='create-test-container'>
                <div className='pages-row'>
                    <div className='pages-col-6'>
                        <div className='form-input'>
                            <label>
                                Test Title:
                                <input
                                    type="text"
                                    value={testTitle}
                                    onChange={(e) => setTestTitle(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className='form-input'>
                            <label>
                                Number of Items:
                                <input
                                    type="number"
                                    min="0"
                                    placeholder='30 is limit'
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
                    <button className='form-button' onClick={handleCreateTest}>Save Test</button>
                </div>
            </div>
        </div>

    );
};

export default CreateTest;
