import React from "react";
import ClassList from "../../components/classcomponents/ClassesList";

function TeacherClasses() {
    return (
        <div>
            <div className='db-header-holder'>
                <h1 className='db-title'>Classes</h1>
            </div>
            <div className="classes-container">
                <ClassList />
            </div>
        </div>
    )
}

export default TeacherClasses;
