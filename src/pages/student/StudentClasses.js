import React from "react";
import StudentClass from "../../components/studentcomponents/StudentClass";

function StudentClasses() {
    return (
        <div>
            <div className='db-header-holder'>
                <h1 className='db-title'>Classes</h1>
            </div>
            <div className="classes-container">
                <StudentClass />
            </div>
        </div>
    )
}

export default StudentClasses;
