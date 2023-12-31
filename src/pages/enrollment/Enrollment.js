
import Header from "../../components/header/Header";
import "./enrollment.css"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import Footer from "../../components/footer/Footer";
import MenuNavigation from "../../components/menunavigation/MenuNavigation";
import EnrollmentForm from "./EnrollmentForm";
import { enrolleesInput } from "../../form/FormSource";




function Enrollment() {

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
                            <div className="enrollment-container">

                                <div className="pages-row">
                                    <div className="pages-col-7">
                                        <h1 className="contact-title">ENROLLMENT FORM</h1>
                                    </div>
                                    <div className="pages-col-5">
                                        <div className="enrollment-form">
                                            <EnrollmentForm inputs={enrolleesInput} />
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

export default Enrollment;
