import React from 'react';
import EventCalendar from '../../components/calendarcomponents/EventCalendar';

function TeacherCalendar() {
    return (
        <div className="calendar-container">
            <div className='calendar-holder'>
                <div className='db-header-holder'>
                    <h1 className='db-title'>Calendar</h1>
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

export default TeacherCalendar;