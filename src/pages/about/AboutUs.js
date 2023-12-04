import React, { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'

function AboutUs() {

    useEffect(() => {
        Aos.init();
    }, [])

    const bgImageStyle = {
        backgroundImage: `url( https://images.pexels.com/photos/6518880/pexels-photo-6518880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
    };

    return (
        <div className="pages-row">
            <div className="pages-col-6 left-about">
                <h1 data-aos="zoom-in" data-aos-duration="1500" className="about-content-title">ABOUT US</h1>
                <div className="about-content-holder" data-aos="fade-up" data-aos-duration="2500">
                    <div className="about-content">
                        <h3>Welcome to H-CAMP</h3>
                        <p>At H-CAMP, we're passionate about unlocking the potential of every student through the power of mathematics. Founded on the belief that every individual has the capacity to excel in math, we strive to create an engaging and supportive learning environment where students not only understand mathematical concepts but also develop a true appreciation for the subject.</p>
                    </div>
                    <div className="about-content">
                        <h3>Our Story</h3>
                        <p>Our journey began with a vision: to transform the way students perceive and engage with mathematics. Fueled by a team of dedicated educators and math enthusiasts, H-CAMP emerged as a beacon of comprehensive and personalized math education. Over the years, we've honed our approach, blending innovation, expertise, and a commitment to student success.</p>
                    </div>
                    <div className="about-content">
                        <h3>Our Philosophy</h3>
                        <p>Math is more than numbers and equations; it's a universal language that shapes our understanding of the world. We believe that mastering mathematics goes beyond solving problems—it's about cultivating critical thinking, logical reasoning, and problem-solving skills that transcend the confines of the classroom.</p>
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

export default AboutUs;
