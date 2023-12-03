import "./courses.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import Footer from "../../components/footer/Footer";
import MenuNavigation from "../../components/menunavigation/MenuNavigation";
import CoursesCarousel from "./CoursesCarousel";




function Courses() {

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <>
            <AnimatedWaves />
            <div className="home-background">
                <MenuNavigation />
                <section className="home-container">
                    <div className="pages-row">
                        <div className="pages-col-12"
                            data-aos="fade-in"
                            data-aos-duration="2500"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine">
                            <Header />
                        </div>
                        <div className="pages-col-12">
                            <div className="courses-container">
                                <CoursesCarousel />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default Courses;
