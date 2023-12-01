import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuizList from "../../components/teachercomponents/QuizList";

function TeacherQuizzes() {
    return (
        <div>
            <div className='db-header-holder'>
                <h3 className='db-title'>Quiz List</h3>
                <Link to='/teacher/createquiz' className="db-links"><h3 className="db-title">Create Quiz</h3><ArrowForwardIosIcon /></Link>
            </div>
            <div className="quiz-list-container">
                <QuizList />
            </div>
        </div>
    )
}

export default TeacherQuizzes;
