import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeworkList from "../../components/teachercomponents/HomeworkList";

function TeacherHomework() {
    return (
        <div>
            <div className='db-header-holder'>
                <h3 className='db-title'>Homework List</h3>
                <Link to='/teacher/createhomework' className="db-links"><h3 className="db-title">Create Homework</h3><ArrowForwardIosIcon /></Link>
            </div>
            <div className="homework-list-container">
                <HomeworkList />
            </div>
        </div>
    )
}

export default TeacherHomework;
