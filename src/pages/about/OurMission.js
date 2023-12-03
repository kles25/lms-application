import React from "react";

function OurMission() {

    const bgImageStyle = {
        backgroundImage: `url( https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 )`,
    };

    return (
        <div className="pages-row">
            <div className="pages-col-6">
                <h1 className="about-content-title">Our Mission</h1>
                <div className="about-content-holder">
                    <div className="about-content">
                        <h3>Our Mission: Empowering Mathematical Excellence</h3>
                        <p>At H-CAMP, our mission is deeply rooted in the belief that mathematics is not just a subject but a key to unlocking limitless potential. We are dedicated to fostering a genuine love for mathematics and empowering students to become not only proficient in math but also confident problem solvers, critical thinkers, and lifelong learners.</p>
                    </div>
                    <div className="about-content">
                        <h3>Fostering a Love for Mathematics</h3>
                        <p>We strive to ignite a spark—a genuine enthusiasm—for the beauty and relevance of mathematics in our daily lives. Our approach goes beyond rote learning; we aim to instill a deep appreciation for the elegance and applicability of mathematical principles, cultivating a passion that extends beyond the classroom.</p>
                    </div>
                    <div className="about-content">
                        <h3>Empowering Confident Problem Solvers</h3>
                        <p>Mathematics is the language of problem-solving, and at [Math Academy Name], we equip our students with the tools and skills necessary to tackle challenges with confidence. Through carefully curated exercises, real-world applications, and engaging problem-solving sessions, we nurture the ability to approach problems systematically and creatively.</p>
                    </div>
                    <div className="about-content">
                        <h3>Cultivating Critical Thinkers</h3>
                        <p>Mathematics isnt just about arriving at solutions; it's about the journey—the process of thinking critically, analyzing situations, and devising strategies. We encourage our students to question, explore, and think independently, fostering a mindset that values curiosity and intellectual inquiry.</p>
                    </div>
                </div>
            </div>
            <div className="pages-col-6">
                <div className="about-content-img" style={bgImageStyle}>
                    <div className="img-shade"></div>
                </div>
            </div>
        </div>
    )
}

export default OurMission;
