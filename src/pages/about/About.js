
import "./about.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import HomeNavigation from "../../components/menunavigation/MenuNavigation";
import AboutNavigation from "../../components/menunavigation/AboutNavigation";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

function About() {

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <>
            <AnimatedWaves />
            <div className="home-background">
                <section className="home-container">
                    <HomeNavigation />
                    <div className="pages-row">
                        <div className="pages-col-12"
                            data-aos="fade-in"
                            data-aos-duration="2500"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine">
                            <Header />
                        </div>
                        <div className="pages-col-12">
                            <div className='pages-container'>
                                <div className="pages-row">
                                    <div className="pages-col-3">
                                        <div className="about-navigation-container">
                                            <AboutNavigation />
                                        </div>
                                    </div>
                                    <div className="pages-col-9">
                                        <div className="about-outlet-container">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default About;
