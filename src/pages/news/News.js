
import "./news.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import HomeNavigation from "../../components/menunavigation/MenuNavigation";
import Carousel from "./Carousel";
import Footer from "../../components/footer/Footer";

function News() {

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
                            <div className="news-container">
                                <Carousel />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default News;
