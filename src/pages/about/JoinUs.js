
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
function JoinUs() {

    useEffect(() => {
        Aos.init();
    }, [])

    const bgImageStyle = {
        backgroundImage: `url( https://images.pexels.com/photos/6518880/pexels-photo-6518880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
    };

    return (
        <div className="pages-row">
            <div className="pages-col-6 left-about">
                <h1 data-aos="zoom-in" data-aos-duration="1500" className="about-content-title">Join Us</h1>
                <div className="about-content-holder" data-aos="fade-up" data-aos-duration="2500">
                    <div className="about-content">
                        <p>At H-CAMP, we welcome students from all backgrounds and abilities. Whether your goal is to boost grades, prepare for standardized tests, or explore the fascinating world of mathematics, we're here to guide you on your journey to mathematical mastery.</p>
                    </div>
                    <div className="about-content">
                        <p>Join us at H-CAMP and embark on an exciting adventure where math becomes not just a subject but a lifelong skill that opens doors to endless opportunities.</p>
                    </div>
                    <div className="about-content">
                        <p>Ready to explore the world of numbers? Contact us today to begin your mathematical journey with H-CAMP!</p>
                    </div>
                    <div className="pages-button">
                        <Link to="">ENROLL NOW</Link>
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

export default JoinUs;
