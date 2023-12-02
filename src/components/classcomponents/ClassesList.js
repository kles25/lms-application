import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';

const ClassList = () => {
    const { currentUser } = useContext(AuthContext);
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [batchStudents, setBatchStudents] = useState([]);

    const fetchBatchesForTeacher = async (teacherId) => {
        const batchesRef = collection(db, 'batches');
        const batchesSnapshot = await getDocs(batchesRef);
        const batchesList = [];

        batchesSnapshot.forEach((doc) => {
            const batch = { id: doc.id, ...doc.data() };
            if (batch.teacher === teacherId) {
                batchesList.push(batch);
            }
        });

        setBatches(batchesList);
    };

    useEffect(() => {
        if (currentUser) {
            const teacherId = currentUser.uid; // Assuming teacher ID is in the user object
            fetchBatchesForTeacher(teacherId);
            console.log(teacherId)
        }
    }, [currentUser]);

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
        <div className='test-list-container'>
            <div className='pages-row'>
                <div className='pages-col-6 left'>
                    <div className='test-list-holder'>
                        {batches.map((batch) => (
                            <nav key={batch.id} onClick={() => handleBatchClick(batch)}>
                                <p className="title">{batch.batchName}</p>
                            </nav>
                        ))}
                    </div>
                </div>
                <div className='pages-col-6 right'>
                    {selectedBatch && (
                        <div className="selected-test-details">
                            <div className="selected-test-holder" style={{ height: "78.5vh", overflowY: "scroll" }}>
                                <div className='db-header-holder'>
                                    <h3 className='db-sub-title'>Batch Details</h3>
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

                                        </nav>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassList;