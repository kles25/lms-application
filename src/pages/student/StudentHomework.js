import React from "react";
import Homework from "../../components/studentcomponents/Homework";

function StudentHomework() {
    return (
        <div>
            <div className='db-header-holder'>
                <h1 className='db-title'>Homework</h1>
            </div>
            <div className="homework-container">
                <Homework />
            </div>
        </div>
    )
}

export default StudentHomework;
