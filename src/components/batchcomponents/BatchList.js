import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../config/firebase';

const BatchList = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [batchStudents, setBatchStudents] = useState([]);

    // Function to fetch batches from Firestore
    const fetchBatches = async () => {
        const batchesRef = collection(db, 'batches');
        const batchesSnapshot = await getDocs(batchesRef);
        const batchesList = [];
        batchesSnapshot.forEach((doc) => {
            batchesList.push({ id: doc.id, ...doc.data() });
        });
        setBatches(batchesList);
    };

    useEffect(() => {
        // Fetch batches when the component mounts
        fetchBatches();
    }, []);

    const handleBatchClick = async (batch) => {
        setSelectedBatch(batch);

        const courseRef = doc(db, 'courses', batch.course);
        const courseSnapshot = await getDoc(courseRef);
        const courseName = courseSnapshot.exists() ? courseSnapshot.data().courseName : '';

        const teacherRef = doc(db, 'teachers', batch.teacher);
        const teacherSnapshot = await getDoc(teacherRef);
        const teacherName = teacherSnapshot.exists() ? teacherSnapshot.data().displayName : '';

        // Fetch students' details associated with the selected batch
        const studentsRef = collection(db, 'students');
        const batchStudentsDetails = [];

        for (const studentId of batch.students) {
            const studentDoc = doc(studentsRef, studentId);
            const studentSnapshot = await getDoc(studentDoc);

            if (studentSnapshot.exists()) {
                batchStudentsDetails.push({ id: studentSnapshot.id, ...studentSnapshot.data() });
            }
        }

        setBatchStudents(batchStudentsDetails);
        setSelectedBatch({ ...batch, course: courseName, teacher: teacherName });
    };

    const closeModal = () => {
        setSelectedBatch(null);
        setBatchStudents([]);
    };

    return (
        <div className='batch-list-container'>
            <div className='batch-list-holder'>
                {batches.map((batch) => (
                    <nav className='pages-col-4' key={batch.id} >
                        <p>{batch.batchName}</p>
                        <button onClick={() => handleBatchClick(batch)}>View Details</button>
                    </nav>
                ))}
            </div>
            {/* Modal to display batch details */}
            {selectedBatch && (
                <div className="modal-container">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <h3 className='db-title'>Batch Details</h3>
                            <CloseIcon onClick={closeModal} />
                        </div>

                        <h5 className='db-sub-title'>Batch: {selectedBatch.batchName}</h5>
                        <h5 className='db-sub-title'>Course: {selectedBatch.course}</h5>
                        <h5 className='db-sub-title'>Teacher: {selectedBatch.teacher}</h5>

                        <h5 className='db-sub-title'>List of Students:</h5>
                        <div className='sl-holder'>
                            {batchStudents.map((student) => (
                                <nav key={student.id}>
                                    {student.displayName} {/* Assuming 'displayName' is the field */}
                                    {/* Display other student details */}
                                </nav>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BatchList;