import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';



const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            const fetchedEvents = snapshot.docs.map((doc) => {
                const event = doc.data();
                return {
                    id: doc.id,
                    title: event.title,
                    start: new Date(event.startDate), // Use startDate from Firestore data
                    end: new Date(event.endDate), //
                    description: event.description,
                };
            });
            setEvents(fetchedEvents);
        }, (error) => {
            console.error('Error fetching events:', error);
        });

        return () => {
            unsubscribe(); // Cleanup the listener on component unmount
        };
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // Set the selected event details when an event is clicked
    };

    const handleCloseEventDetails = () => {
        setSelectedEvent(null); // Close the event details section/modal
    };

    return (
        <div className='event-calendar-holder'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                selectable
                resizable
                style={{ padding: '2vh' }}
            />
            {selectedEvent && (
                <div className="event-details" style={{ marginTop: "2vh" }}>
                    <h3 className='db-title'>Event Details</h3>
                    <p>Title: {selectedEvent.title}</p>
                    <p>Start: {selectedEvent.start.toString()}</p>
                    <p>End: {selectedEvent.end.toString()}</p>
                    <p>Description: {selectedEvent.description}</p>
                    <button className='form-button' onClick={handleCloseEventDetails}>Close</button>
                </div>
            )}
        </div>

    );
};

export default EventCalendar;