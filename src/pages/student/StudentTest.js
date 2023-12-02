import React from "react";
import Tests from "../../components/studentcomponents/Tests";

function StudentTest() {
    return (
        <div>
            <div className='db-header-holder'>
                <h1 className='db-title'>Tests</h1>
            </div>
            <div className="classes-container">
                <Tests />
            </div>
        </div>
    )
}

export default StudentTest;
