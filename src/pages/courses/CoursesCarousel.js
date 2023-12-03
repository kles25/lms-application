import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

const CourseCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
            const fetchedSlides = snapshot.docs.map((doc) => {
                const course = doc.data();
                return {
                    title: course.courseName,
                    image: course.imageUrl,
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
            <h1 className='contact-title'>COURSES WE OFFER</h1>
            <div className='pages-row'>
                <div className='pages-col-6'>
                    <div className='carousel-image-holder'>
                        <div className='carousel-image' style={{ backgroundImage: `url(${currentSlide?.image})` }} >
                            <div className='carousel-image-shade'>
                                {/* <p className='carousel-number'>{`0${currentSlideIndex + 1}`.slice(-2)}</p> */}
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
                            <div className='pages-button'>
                                <Link to="/enroll">Enroll Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCarousel;
