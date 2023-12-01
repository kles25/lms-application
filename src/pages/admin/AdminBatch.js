import React from "react";
import "./admindashboard.css"
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BatchList from "../../components/batchcomponents/BatchList";

function AdminBatch() {
    return (
        <div className="">
            <div className="">
                <div className="db-header-holder">
                    <h3 className="db-title">Batch List</h3>
                    <Link className="db-links" to="/admin/createbatch"><h3 className="db-title">Create Batch</h3><ArrowForwardIosIcon /></Link>
                </div>
                <BatchList />
            </div>
        </div>
    )
}

export default AdminBatch;
