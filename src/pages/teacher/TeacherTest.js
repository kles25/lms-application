import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TestsList from "../../components/teachercomponents/TestsList";

function TeacherTest() {
    return (
        <div>
            <div className='db-header-holder'>
                <h3 className='db-title'>Test List</h3>
                <Link to='/teacher/createtest' className="db-links"><h3 className="db-title">Create Test</h3><ArrowForwardIosIcon /></Link>
            </div>
            <div className="test-list-container">
                <TestsList />
            </div>
        </div>
    )
}

export default TeacherTest;
