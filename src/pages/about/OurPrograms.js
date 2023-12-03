
import React from "react";

function OurPrograms() {

    const bgImageStyle = {
        backgroundImage: `url( https://images.pexels.com/photos/4143798/pexels-photo-4143798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
    };

    return (
        <div className="pages-row">
            <div className="pages-col-6 left-about">
                <h1 className="about-content-title">Our Programs</h1>
                <div className="about-content-holder">
                    <div className="about-content">
                        <h3>Tailored for Every Learning Stage</h3>
                        <p>At H-CAMP, our curriculum isn't just a collection of courses—it's a meticulously crafted roadmap tailored to accommodate students at various stages of their mathematical journey. From foundational concepts to advanced topics, we offer a diverse array of programs designed to meet the needs of learners across all ages and proficiency levels.</p>
                    </div>
                    <div className="about-content">
                        <h3>Building Blocks of Mastery</h3>
                        <p>For young learners taking their first steps into the world of numbers, our foundational programs focus on instilling a solid understanding of arithmetic, basic geometry, and fundamental mathematical concepts. These courses are designed to nurture curiosity, develop problem-solving skills, and lay the groundwork for future mathematical exploration.</p>
                    </div>
                    <div className="about-content">
                        <h3>Navigating Intermediate Levels</h3>
                        <p>As students progress, our intermediate programs delve deeper into subjects like algebra, trigonometry, and geometry. These courses are structured to challenge and engage learners, fostering critical thinking and logical reasoning. With an emphasis on practical applications, students begin to see the relevance of mathematical principles in everyday life.</p>
                    </div>
                </div>
            </div>
            <div className="pages-col-6 right-about">
                <div className="about-content-img" style={bgImageStyle}>
                    <div className="img-shade"></div>
                </div>
            </div>
        </div>
    )
}

export default OurPrograms;
