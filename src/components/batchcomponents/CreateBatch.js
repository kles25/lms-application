import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';

const CreateBatch = () => {
    const [batchName, setBatchName] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedStudents, setSelectedStudents] = useState('');
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [displaySelectedStudents, setDisplaySelectedStudents] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const navigate = useNavigate();

    // Function to fetch courses from Firestore
    const fetchCourses = async () => {
        const coursesRef = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesRef);
        const coursesList = [];
        coursesSnapshot.forEach((doc) => {
            coursesList.push({ id: doc.id, ...doc.data() });
        });
        setCourses(coursesList);
        console.log(coursesList)
    };

    // Function to fetch teachers from Firestore
    const fetchTeachers = async () => {
        const teachersRef = collection(db, 'teachers');
        const teachersSnapshot = await getDocs(teachersRef);
        const teachersList = [];
        teachersSnapshot.forEach((doc) => {
            teachersList.push({ id: doc.id, ...doc.data() });
        });
        setTeachers(teachersList);
        console.log(teachersList)
    };

    // Function to fetch students from Firestore
    const fetchStudents = async () => {
        const studentsRef = collection(db, 'students');
        const studentsSnapshot = await getDocs(studentsRef);
        const studentsList = [];
        studentsSnapshot.forEach((doc) => {
            studentsList.push({ id: doc.id, ...doc.data() });
        });
        setStudents(studentsList);
        console.log(studentsList)
    };

    useEffect(() => {
        // Fetch courses, teachers, and students when the component mounts
        fetchCourses();
        fetchTeachers();
        fetchStudents();
    }, []); // Empty dependency array ensures these functions run only once

    useEffect(() => {
        // Update the display of selected students whenever 'selectedStudents' changes
        setDisplaySelectedStudents(
            students.filter((student) => selectedStudents.includes(student.id))
        );
    }, [selectedStudents, students]);

    const handleCreateBatch = async (e) => {
        e.preventDefault();
        try {
            const batchRef = collection(db, 'batches');
            const batchDoc = await addDoc(batchRef, {
                batchName: batchName,
                course: selectedCourse,
                teacher: selectedTeacher,
                students: selectedStudents // Assuming students are already selected
            });

            console.log("Batch created with ID: ", batchRef.id);

            const studentsRef = collection(db, 'students');
            for (const studentId of selectedStudents) {
                const studentDoc = doc(studentsRef, studentId);
                await updateDoc(studentDoc, {
                    batchId: batchDoc.id // Add the batch ID to the student's document
                });
            }

            // Reset the form fields after successful creation
            setBatchName('');
            setSelectedCourse('');
            setSelectedTeacher('');
            setSelectedStudents('');
            setShowNotification(true);
            setShowSpinner(true);
            setTimeout(() => {
                setShowNotification(false);
                setShowSpinner(false);
                navigate('/admin/batch')
            }, 3000);
        } catch (error) {
            console.error("Error creating batch: ", error);
        }
    };


    return (
        <div className='create-batch-container'>
            <div className={`notification-up ${showNotification ? 'notification-ups' : ''}`}>
                Saved Succesfully!
            </div>
            <div className={`spinner-up ${showSpinner ? 'spinner-ups' : ''}`} >
                <div className="spinner"></div>
            </div>
            <div className='db-header-holder'>
                <Link className="db-links" to="/admin/batch"><ArrowBackIosIcon /><h3 className="db-title">Batch List</h3></Link>
                <h3 className="db-title">Create Batch</h3>
            </div>
            <div className='pages-row'>
                <div className='pages-col-4'>
                    <div className='form-input'>
                        <input
                            type="text"
                            placeholder="Enter batch name"
                            value={batchName}
                            onChange={(e) => setBatchName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='pages-col-4'>
                    <div className='form-input'>
                        {/* Dropdown for selecting courses */}
                        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='pages-col-4'>
                    <div className='form-input'>
                        {/* Dropdown for selecting teachers */}
                        <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                            <option value="">Select a teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='batch-selection-holder'>
                <div className='pages-row'>
                    <div className='pages-col-6'>
                        <div className='ssh-class'>
                            <h5 className='db-sub-title'>Select Students:</h5>
                            <ul>
                                {students.map((student) => (
                                    <li key={student.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={student.id}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    const isChecked = e.target.checked;

                                                    if (isChecked) {
                                                        setSelectedStudents([...selectedStudents, selectedId]);
                                                    } else {
                                                        const filteredStudents = selectedStudents.filter(
                                                            (id) => id !== selectedId
                                                        );
                                                        setSelectedStudents(filteredStudents);
                                                    }
                                                }}
                                            />
                                            {student.displayName} {/* Assuming 'displayName' is the field */}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className='pages-col-6'>
                        <div className='ssh-class'>
                            <h5 className='db-sub-title'>Selected Students:</h5>
                            <ul>
                                {displaySelectedStudents.map((student) => (
                                    <li key={student.id}>
                                        {student.displayName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <button onClick={handleCreateBatch}>Create Batch</button>
        </div>
    );
};

export default CreateBatch;