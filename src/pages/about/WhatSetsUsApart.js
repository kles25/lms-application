import React, { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'

function WhatSetsUsApart() {

    useEffect(() => {
        Aos.init();
    }, [])

    const bgImageStyle = {
        backgroundImage: `url( https://images.pexels.com/photos/19148683/pexels-photo-19148683/free-photo-of-boy-with-a-backpack-and-books-posing-in-a-classroom-decorated-with-balloons.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
    };

    return (
        <div className="pages-row">
            <div className="pages-col-6 left-about">
                <h1 data-aos="zoom-in" data-aos-duration="1500" className="about-content-title">What Sets Us Apart</h1>
                <div className="about-content-holder" data-aos="fade-up" data-aos-duration="2500">
                    <div className="about-content">
                        <h3>Expert Instructors: Passionate Mentors</h3>
                        <p>Our pride lies in our team of instructors—seasoned professionals whose passion for mathematics goes beyond teaching; it's a commitment to nurturing budding minds. They bring a wealth of experience, academic prowess, and a contagious enthusiasm for the subject, igniting a similar fervor within their students. Beyond qualifications, our instructors serve as mentors, guiding students not just through mathematical concepts but through the art of problem-solving and analytical thinking.</p>
                    </div>
                    <div className="about-content">
                        <h3>Tailored Personalization: Customizing Success Stories</h3>
                        <p>Understanding that no two students are alike, we go the extra mile to create personalized learning experiences. Our approach isn't a one-size-fits-all; instead, it's tailored to accommodate diverse learning styles, individual strengths, and areas needing improvement. We conduct thorough assessments to craft customized learning plans that address specific needs, ensuring that each student receives the precise support and guidance necessary for their academic journey.</p>
                    </div>
                    <div className="about-content">
                        <h3>Immersive Interactive Learning: Engaging Beyond the Numbers</h3>
                        <p>Mathematics transcends mere calculations—it's a vibrant language, and we make sure our students speak it fluently. Our commitment to interactive learning goes beyond traditional classroom methods. We integrate state-of-the-art technology, immersive simulations, hands-on activities, and group collaborations, creating an atmosphere where learning becomes an adventure. Through this interactive approach, we infuse excitement into every lesson, fostering not just comprehension but a genuine fascination for mathematical principles.</p>
                    </div>
                </div>
            </div>
            <div className="pages-col-6 right-about">
                <div data-aos="fade-left" data-aos-duration="1000" className="about-content-img" style={bgImageStyle}>
                    <div className="img-shade"></div>
                </div>
            </div>
        </div>
    )
}

export default WhatSetsUsApart;
