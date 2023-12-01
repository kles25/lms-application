import React, { useState, useEffect, useContext } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';

const StudentClass = () => {
    const { currentUser } = useContext(AuthContext);
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [batchStudents, setBatchStudents] = useState([]);
    const [batchHomeworks, setBatchHomeworks] = useState([]);

    const fetchBatchesForStudent = async (studentId) => {
        const batchesRef = collection(db, 'batches');
        const batchesSnapshot = await getDocs(batchesRef);
        const batchesList = [];

        batchesSnapshot.forEach((doc) => {
            const batch = { id: doc.id, ...doc.data() };
            if (batch.students.includes(studentId)) {
                batchesList.push(batch);
            }
        });
        setBatches(batchesList);



        // if (studentSnapshot.exists()) {
        //     const studentData = studentSnapshot.data();
        //     const studentBatchId = studentData.batch; // Assuming 'batch' holds the student's batch ID
        //     setStudentBatchId(studentBatchId);

        //     const batchRef = doc(db, 'batches', studentBatchId);
        //     const batchSnapshot = await getDoc(batchRef);

        //     if (batchSnapshot.exists()) {
        //         const studentBatch = batchSnapshot.data();
        //         setBatches([studentBatch]);
        //     }
        // }
    };

    useEffect(() => {
        if (currentUser) {
            const studentId = currentUser.uid; // Assuming teacher ID is in the user object
            fetchBatchesForStudent(studentId);
            console.log(studentId)
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

        // Fetch homeworks associated with the selected batch
        const batchHomeworksRef = doc(db, 'batches', batch.id);
        const batchHomeworksSnapshot = await getDoc(batchHomeworksRef);

        if (batchHomeworksSnapshot.exists()) {
            const batchData = batchHomeworksSnapshot.data();
            if (batchData && batchData.homeworks) {
                const homeworksDetails = [];
                for (const homeworkId of batchData.homeworks) {
                    const homeworkRef = doc(db, 'homeworks', homeworkId);
                    const homeworkSnapshot = await getDoc(homeworkRef);

                    if (homeworkSnapshot.exists()) {
                        homeworksDetails.push({ id: homeworkSnapshot.id, ...homeworkSnapshot.data() });
                    }
                }
                setBatchHomeworks(homeworksDetails);
            } else {
                setBatchHomeworks([]); // No homework found for the batch
            }
        } else {
            setBatchHomeworks([]); // Batch not found or no homework available
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
                <div className='pages-col-6'>
                    <div className='test-list-holder'>
                        {batches.map((batch) => (
                            <nav
                                key={batch.id}
                                onClick={() => handleBatchClick(batch)} >
                                <p>{batch.batchName}</p>
                                <p>View Details</p>
                            </nav>
                        ))}
                    </div>
                </div>
            </div>

            <div className='pages-col-6'>
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
                                        {/* Display other student details */}
                                    </nav>
                                ))}
                            </div>

                            <h5 className='db-sub-title'>List of Homework:</h5>
                            <div className='sl-holder'>
                                {batchHomeworks.map((homework) => (
                                    <nav key={homework.id}>
                                        <p>Title: {homework.title}</p>
                                        {/* <p>Description: {homework.description}</p>
                                    <p>Start Time: {homework.startTime}</p>
                                    <p>End Time: {homework.endTime}</p>
                                    <p>Points: {homework.points}</p> */}
                                    </nav>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentClass;