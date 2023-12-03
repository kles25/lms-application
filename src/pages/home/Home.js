import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./home.css"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import AnimateCube from "../../components/animation/AnimatedCube";
import Footer from "../../components/footer/Footer";
import MenuNavigation from "../../components/menunavigation/MenuNavigation";




function Home() {

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
                            <div className="pages-row home-hero">
                                <div className="pages-col-7">
                                    <div className="hero-details">
                                        <h1 data-aos="fade-right"
                                            data-aos-offset="300"
                                            data-aos-duration="2500"
                                            data-aos-easing="ease-in-sine">Dive into Math's Ocean of Possibilities!</h1>
                                        <p data-aos="fade-right" data-aos-duration="2000" data-aos-offset="300" data-aos-easing="ease-in-sine">Embark on an adventure where the boundless depths of mathematics meet the endless expanse of the ocean. Discover the synergy between numbers and waves, unlocking a world of infinite possibilities waiting to be explored.</p>
                                        <div data-aos="fade-right" data-aos-duration="1500" data-aos-easing="ease-in-sine" className="button-holder">
                                            <Link to="">
                                                <button className="hb-two">Begin Enrollment</button>
                                            </Link>
                                        </div>
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
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default Home;
