import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CourseList = () => {
    const [coursesList, setCoursesList] = useState([]);

    useEffect(() => {


        const unsub = onSnapshot(
            collection(db, "courses"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setCoursesList(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const CourseDetailsLink = ({ id, courseName }) => (
        <Link to={`/course/${id}`} style={{ textDecoration: 'none' }} key={id}>
            <div className='course-card'>
                <div className='course-card-header'>
                    <h4>{courseName}</h4>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="course-list-container">
            <div className='db-header-holder'>
                <h3 className='db-title'>Courses</h3>
                <Link className='db-links' to="/admin/addcourse"><h3 className='db-title'>Add Course</h3><ArrowForwardIosIcon /></Link>
            </div>
            <div className='pages-row courses-holder'>
                {coursesList.map((course) => (
                    <div className='pages-col-3' key={course.id}>
                        <div className='course-holder'>
                            <CourseDetailsLink id={course.id} courseName={course.courseName} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;