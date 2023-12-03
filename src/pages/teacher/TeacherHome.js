import React from "react";
import CustomPieChart from "../../components/charts/CustomPieChart";
import EventList from "../../components/admincomponents/EventList";

function TeacherHome() {
    return (
        <div className="admin-home-container">
            <h3 style={{ marginBottom: "5vh" }} className="db-title">Enrolled Student</h3>
            <div className="pages-row">
                <div className="pages-col-12">
                    <div className="chart-holder">
                        <CustomPieChart />
                    </div>
                </div>
                <div className="pages-col-6">
                    <h3 style={{ margin: "5vh 0" }} className="db-title">Event List</h3>
                    <div className="even-list-holder">
                        <EventList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherHome;
