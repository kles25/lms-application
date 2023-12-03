
import "./about.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import HomeNavigation from "../../components/menunavigation/MenuNavigation";
import AboutNavigation from "../../components/menunavigation/AboutNavigation";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import MoreIcon from '@mui/icons-material/More';


function About() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

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
                                    <div className="about-ribbon">
                                        <MoreIcon className={click ? 'active' : ''} onClick={handleClick} />
                                    </div>
                                    <div className="pages-col-3">
                                        <div className={click ? 'about-navigation-container active' : 'about-navigation-container'}>
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
