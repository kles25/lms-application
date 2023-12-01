import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';



const AddCourse = () => {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [courses, setCourses] = useState([
        {
            courseName: '',
            units: [
                {
                    unitTitle: '',
                    unitDetails: '',
                    topics: ['']
                }
            ]
        }
    ]);

    const handleCourseChange = (e, courseIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].courseName = e.target.value;
        setCourses(updatedCourses);
    };

    const handleUnitChange = (e, courseIndex, unitIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].units[unitIndex].unitTitle = e.target.value;
        setCourses(updatedCourses);
    };

    const handleUnitDetailsChange = (e, courseIndex, unitIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].units[unitIndex].unitDetails = e.target.value;
        setCourses(updatedCourses);
    };

    const handleTopicChange = (e, courseIndex, unitIndex, topicIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].units[unitIndex].topics[topicIndex] = e.target.value;
        setCourses(updatedCourses);
    };

    const addUnit = (courseIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].units.push({
            unitTitle: '',
            topics: ['']
        });
        setCourses(updatedCourses);
    };

    const addTopic = (courseIndex, unitIndex) => {
        const updatedCourses = [...courses];
        updatedCourses[courseIndex].units[unitIndex].topics.push('');
        setCourses(updatedCourses);
    };

    const submitCourse = async () => {
        try {
            for (const course of courses) {
                await addDoc(collection(db, "courses"), {
                    ...course,
                    timestamp: serverTimestamp()

                });
                setShowNotification(true);
                setShowSpinner(true);
                setTimeout(() => {
                    setShowNotification(false);
                    setShowSpinner(false);
                    navigate('/admin/courses');
                }, 3000);

            }

            console.log('Courses submitted successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const displayCourses = courses.map((course, courseIndex) => (
        <div key={courseIndex}>
            <div className='unit-holder'>
                <input
                    className='course-name'
                    type="text"
                    value={course.courseName}
                    onChange={(e) => handleCourseChange(e, courseIndex)}
                    placeholder="Enter Course Name"
                />
            </div>

            {course.units.map((unit, unitIndex) => (
                <div className='unit-holder' key={unitIndex}>
                    <input
                        type="text"
                        value={unit.unitTitle}
                        onChange={(e) => handleUnitChange(e, courseIndex, unitIndex)}
                        placeholder={`Enter Unit Title ${unitIndex + 1}`}
                    />
                    <textarea
                        value={unit.unitDetails}
                        onChange={(e) => handleUnitDetailsChange(e, courseIndex, unitIndex)}
                        placeholder={`Enter Unit Details ${unitIndex + 1}`}
                        rows="4"
                    >
                    </textarea>
                    <br />
                    {unit.topics.map((topic, topicIndex) => (
                        <input
                            key={topicIndex}
                            type="text"
                            value={topic}
                            onChange={(e) => handleTopicChange(e, courseIndex, unitIndex, topicIndex)}
                            placeholder={`Enter Topic ${topicIndex + 1}`}
                        />
                    ))}
                    <button onClick={() => addTopic(courseIndex, unitIndex)}>Add Topic</button>

                </div>
            ))}
            <button onClick={() => addUnit(courseIndex)}>Add Unit</button>
        </div>
    ));

    return (
        <div className='add-course-container'>
            <div className={`notification-up ${showNotification ? 'notification-ups' : ''}`}>
                Saved Succesfully!
            </div>
            <div className={`spinner-up ${showSpinner ? 'spinner-ups' : ''}`} >
                <div className="spinner"></div>
            </div>
            <div className='add-course-holder'>
                <div className='db-header-holder'>
                    <Link className="db-links" to="/admin/courses"><ArrowBackIosIcon /><h3 className='db-title'>Course List</h3></Link>
                    <h3 className='db-title'>Add Course</h3>
                </div>

                <div className='add-course-form'>
                    {displayCourses}
                </div>
                <div className='ac-bttn-hldr'>
                    <button onClick={submitCourse}>Add</button>
                </div>

            </div>
        </div>
    );
};

export default AddCourse;