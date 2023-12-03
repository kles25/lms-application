import React, { useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../../context/AuthContext';

const EventForm = () => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [event, setEvent] = useState({
        title: '',
        startDate: new Date(),
        startTime: '09:00', // Default start time
        endDate: new Date(),
        endTime: '10:00',
        description: '',
    });

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleStartDateChange = (date) => {
        setEvent({ ...event, startDate: date });
    };

    const handleStartTimeChange = (time) => {
        setEvent({ ...event, startTime: time });
    };

    const handleEndDateChange = (date) => {
        setEvent({ ...event, endDate: date });
    };

    const handleEndTimeChange = (time) => {
        setEvent({ ...event, endTime: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!event.title || !event.startDate || !event.endDate) {
            alert('Title, Start Date, and End Date are required!');
            return;
        }

        try {
            let downloadURL = null;

            if (image) {
                const date = new Date().getTime();
                const storageRef = ref(storage, `events/${currentUser.displayName + date}`); // Change 'uploads' to your desired folder name
                await uploadBytesResumable(storageRef, image);
                downloadURL = await getDownloadURL(storageRef);
                // Upload the file to Firebase Storage
            }

            const startDateTime = new Date(`${event.startDate.toDateString()} ${event.startTime}`);
            const endDateTime = new Date(`${event.endDate.toDateString()} ${event.endTime}`);
            // Add event to Firestore
            const eventsCollectionRef = collection(db, 'events');
            await addDoc(eventsCollectionRef, {
                title: event.title,
                startDate: startDateTime.toISOString(), // Store start date-time as string in Firestore
                endDate: endDateTime.toISOString(), // Store end date-time as string in Firestore
                description: event.description,
                imageUrl: downloadURL,
            });

            // Clear the form after adding the event
            setEvent({
                title: '',
                startDate: new Date(),
                startTime: '09:00',
                endDate: new Date(),
                endTime: '10:00',
                description: '',
            });
            navigate('/admin/calendar')
        } catch (error) {
            console.error('Error adding event: ', error);
        }
    };

    return (
        <div className='event-holder'>
            <div className='db-header-holder'>
                <Link className='db-links' to='/admin/calendar'><ArrowBackIosIcon /><h3 className='db-title'>Calendar</h3></Link>
                <h3 className='db-title'>Create Event</h3>
            </div>

            <form className='pages-row' onSubmit={handleSubmit}>
                <div className='pages-col-6 form-input'>
                    <label>Title:</label>
                    <input type="text" name="title" value={event.title} onChange={handleInputChange} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>Event Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>Start Date:</label>
                    <DatePicker selected={event.startDate} onChange={handleStartDateChange} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>Start Time:</label>
                    <input type="time" name="startTime" value={event.startTime} onChange={(e) => handleStartTimeChange(e.target.value)} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>End Date:</label>
                    <DatePicker selected={event.endDate} onChange={handleEndDateChange} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>End Time:</label>
                    <input type="time" name="endTime" value={event.endTime} onChange={(e) => handleEndTimeChange(e.target.value)} />
                </div>
                <div className='pages-col-6 form-input'>
                    <label>Description:</label>
                    <textarea rows="6" name="description" value={event.description} onChange={handleInputChange}></textarea>
                </div>

                <div className='pages-col-12 event-button'>
                    <button className='form-button' type="submit">Create</button>
                </div>

            </form>
        </div>
    );
};

export default EventForm;