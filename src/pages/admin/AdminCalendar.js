import React from 'react';
import "./admindashboard.css";
import { Link } from 'react-router-dom';
import EventCalendar from '../../components/calendarcomponents/EventCalendar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function AdminCalendar() {
    return (
        <div className="calendar-container">
            <div className='calendar-holder'>
                <div className='db-header-holder'>
                    <h1 className='db-title'>My Calendar</h1>
                    <Link className='db-links' to='/admin/createevent'><h3 className='db-title'>Create an Event</h3><ArrowForwardIosIcon /></Link>
                </div>
                <div className='pages-row'>
                    <div className='pages-col-12'>
                        <EventCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCalendar;