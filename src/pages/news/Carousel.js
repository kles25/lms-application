import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'events'), orderBy('startDate')),
            (snapshot) => {
                const fetchedSlides = snapshot.docs.map((doc) => {
                    const event = doc.data();
                    const startDate = new Date(event.startDate);
                    const endDate = new Date(event.endDate);

                    // Formatting dates to desired format (adjust as needed)
                    const formattedStartDate = startDate.toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'short'
                    });
                    const formattedEndDate = endDate.toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'short'
                    });
                    return {
                        title: event.title,
                        description: event.description,
                        image: event.imageUrl, // Use imageUrl from Firestore
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,

                    };
                });
                setSlides(fetchedSlides);
            }, (error) => {
                console.error('Error fetching events:', error);
            });

        return () => {
            unsubscribe(); // Cleanup the listener on component unmount
        };
    }, []);

    const currentSlide = slides[currentSlideIndex];

    const goToPreviousSlide = () => {
        const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        setCurrentSlideIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentSlideIndex + 1) % slides.length;
        setCurrentSlideIndex(newIndex);
    };

    return (
        <div className="carousel">
            <h1 className='contact-title'>EVENT NEWS</h1>
            <div className='pages-row'>
                <div className='pages-col-6'>
                    <div className='carousel-image-holder'>
                        <div className='carousel-image' style={{ backgroundImage: `url(${currentSlide?.image})` }} >
                            <div className='carousel-image-shade'>
                                {/* Added a conditional check for currentSlide */}
                                <p className='carousel-number'>{`0${currentSlideIndex + 1}`.slice(-2)}</p>
                                <div className='carousel-buttons'>
                                    <button onClick={goToPreviousSlide}><ArrowBackIosIcon /></button>
                                    <button onClick={goToNextSlide}><ArrowForwardIosIcon /></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='pages-col-6'>
                    <div className="carousel-slide">
                        <div className="slide-details">
                            <h2>{currentSlide?.title}</h2>
                            <p className='event-details'>{currentSlide?.description}</p>
                            <p>{currentSlide?.startDate}</p>
                            <p>{currentSlide?.endDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
