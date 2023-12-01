import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const TestsList = () => {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);

    // Fetch all tests from Firestore collection
    const fetchTests = async () => {
        try {
            const testsRef = collection(db, 'tests'); // Replace 'dynamic_tests' with your collection name
            const testsSnapshot = await getDocs(testsRef);
            const testsList = [];
            testsSnapshot.forEach((doc) => {
                testsList.push({ id: doc.id, ...doc.data() });
            });
            setTests(testsList);
        } catch (error) {
            console.error('Error fetching tests: ', error);
        }
    };

    useEffect(() => {
        // Fetch tests when the component mounts
        fetchTests();
    }, []);

    const handleTestClick = (test) => {
        setSelectedTest(test); // Update selectedTest state with the clicked test
    };

    return (

        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {tests.map((test) => (
                            <nav
                                key={test.id}
                                className={selectedTest && selectedTest.id === test.id ? 'active' : ''}
                                onClick={() => handleTestClick(test)}>
                                <p className='title'>{test.title}</p>
                                <p className='items'>Items: {test.items.length}</p>
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedTest && (
                        <div className='selected-test-details'>
                            <div className='selected-test-holder'>
                                <h3>{selectedTest.title}</h3>
                                {selectedTest.items.map((item, index) => (
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

export default TestsList;
