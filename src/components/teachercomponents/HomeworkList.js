import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const HomeworkList = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [selectedHomework, setSelectedHomework] = useState(null);

    const fetchHomeworks = async () => {
        try {
            const homeworksRef = collection(db, 'homeworks');
            const homeworksSnapshot = await getDocs(homeworksRef);
            const homeworksList = [];
            homeworksSnapshot.forEach((doc) => {
                const data = doc.data();
                const startDate = new Date(data.startTime); // Convert startTime to a Date object
                const endDate = new Date(data.endTime); // Convert endTime to a Date object
                homeworksList.push({ id: doc.id, ...data, startDate, endDate });
            });
            setHomeworks(homeworksList);
        } catch (error) {
            console.error('Error fetching homeworks: ', error);
        }
    };

    useEffect(() => {
        fetchHomeworks();
    }, []);

    const handleHomeworkClick = (homework) => {
        setSelectedHomework(homework);
    };

    const currentTime = new Date().getTime();

    return (
        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {homeworks.map((homework) => (
                            <nav
                                key={homework.id}
                                className={selectedHomework && selectedHomework.id === homework.id ? 'active' : ''}
                                onClick={() => handleHomeworkClick(homework)}
                            >
                                <p className='title'>{homework.title}</p>
                                <p className='items'>Points: {homework.points}</p>
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedHomework && (
                        <div className='selected-test-details'>
                            <div className='selected-test-holder'>
                                <h3>{selectedHomework.title}</h3>
                                {selectedHomework.startDate > currentTime ? (
                                    <>
                                        <p>The details will be available once the homework starts.</p>
                                        <p>Starts In: {selectedHomework.startTime}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className='homework-details'>{selectedHomework.description}</p>
                                        <p>Points: {selectedHomework.points}</p>
                                        <p>Starts In: {selectedHomework.startTime}</p>
                                        <p>Ends In: {selectedHomework.endTime}</p>

                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default HomeworkList;
