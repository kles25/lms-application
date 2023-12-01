
import "./contact.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import AnimateCube from "../../components/animation/AnimatedCube";
import HomeNavigation from "../../components/menunavigation/MenuNavigation";

function Contact() {

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
                            <div className="pages-row home-hero">
                                <div className="pages-col-7">
                                    <div className="hero-details">
                                        <h1 data-aos="fade-right"
                                            data-aos-offset="300"
                                            data-aos-duration="2500"
                                            data-aos-easing="ease-in-sine">Contact</h1>
                                    </div>
                                </div>
                                <div className="pages-col-5">
                                    <div className="hero-img"
                                        data-aos="zoom-in"
                                        data-aos-duration="3000"
                                        data-aos-offset="300"
                                        data-aos-easing="ease-in-sine">
                                        <AnimateCube />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Contact;
