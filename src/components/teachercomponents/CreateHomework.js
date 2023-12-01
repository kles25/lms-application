import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateHomework = () => {
    const [homeworkTitle, setHomeworkTitle] = useState('');
    const [homeworkDescription, setHomeworkDescription] = useState('');
    const [points, setPoints] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [batches, setBatches] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const navigate = useNavigate();
    const [detailsDisabled, setDetailsDisabled] = useState(false);

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

    const handleCreateHomework = async () => {
        try {
            const homeworkRef = collection(db, 'homeworks');
            const homeworkDoc = await addDoc(homeworkRef, {
                title: homeworkTitle,
                description: homeworkDescription,
                points: points,
                startTime: startTime,
                endTime: endTime,
            });

            const batchRef = doc(db, 'batches', selectedBatch);

            const batchSnap = await getDoc(batchRef);
            const batchData = batchSnap.data();

            const updatedHomework = batchData.homeworks ? [...batchData.homeworks, homeworkDoc.id] : [homeworkDoc.id];
            await updateDoc(batchRef, {
                homeworks: updatedHomework
            });

            setHomeworkTitle('');
            setHomeworkDescription('');
            setPoints('');
            setSelectedBatch('');
            navigate('/teacher/homework');
        } catch (error) {
            console.error("Error creating homework: ", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const startDateTime = new Date(startTime).getTime();
            const endDateTime = new Date(endTime).getTime();

            if (now < startDateTime || now > endDateTime) {
                setDetailsDisabled(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    return (
        <div>
            <div className='db-header-holder'>
                <Link to='/teacher/homework' className="db-links"><ArrowBackIosIcon /><h3 className="db-title">Homework List</h3></Link>
                <h3 className='db-title'>Create Homework</h3>
            </div>
            <div className='create-homework-container'>
                <div className='pages-row'>
                    <div className='pages-col-6'>
                        <div className='form-input'>
                            <label> Homework Title:</label>
                            <input
                                type="text"
                                value={homeworkTitle}
                                onChange={(e) => setHomeworkTitle(e.target.value)}
                            />
                        </div>
                        <div className='form-input'>
                            <label> Homework Description:</label>
                            <textarea
                                rows="9"
                                value={homeworkDescription}
                                onChange={(e) => setHomeworkDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='pages-col-6'>
                        <div className='form-input'>
                            <label>Points:</label>
                            <input
                                type="number"
                                min="0"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                            />
                        </div>
                        <div className='form-input'>
                            <label>Start Time:</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className='form-input'>
                            <label>End Time:</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className='form-input'>
                            <label> Select Batch:</label>
                            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                                <option value="">Select a batch</option>
                                {batches.map((batch) => (
                                    <option key={batch.id} value={batch.id}>
                                        {batch.batchName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button className='form-button' onClick={handleCreateHomework}>Create Homework</button>
            </div>
            <div className='disabled-details'>
                {detailsDisabled && <p>The details for this homework are disabled.</p>}
            </div>
        </div>
    );
};

export default CreateHomework;
