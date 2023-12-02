import React from "react";
import Quizzes from "../../components/studentcomponents/Quizzes";

function StudentQuizzes() {
    return (
        <div>
            <div className='db-header-holder'>
                <h1 className='db-title'>Quizzes</h1>
            </div>
            <div className="classes-container">
                <Quizzes />
            </div>
        </div>
    )
}

export default StudentQuizzes;
