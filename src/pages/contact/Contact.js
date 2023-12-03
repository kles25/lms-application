
import "./contact.css"
import Header from "../../components/header/Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import HomeNavigation from "../../components/menunavigation/MenuNavigation";
import Footer from "../../components/footer/Footer";

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
                            <div className="contact-container">
                                <div className="pages-row">
                                    <div className="pages-col-5">
                                        <div className="contact-form">
                                            <form>
                                                <h3 className="contact-title">Contact Us</h3>
                                                <div className="form-input">
                                                    <label>Full Name</label>
                                                    <input type="text" placeholder="Full Name" />
                                                </div>
                                                <div className="form-input">
                                                    <label>Email</label>
                                                    <input type="email" placeholder="Email" />
                                                </div>
                                                <div className="form-input">
                                                    <label>Message</label>
                                                    <textarea rows="5" placeholder="Your Message" />
                                                </div>
                                                <div className="form-input">
                                                    <button className="form-button">Submit</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="pages-col-7">
                                        <div className="contact-details">
                                            <iframe
                                                title="Google Maps"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14092.752696068284!2d86.91467536715975!3d27.988138714539044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2sMt%20Everest!5e0!3m2!1sen!2sph!4v1701516921145!5m2!1sen!2sph"
                                                style={{ border: 0, height: "40vh", width: "100%", borderRadius: "1vh" }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                            <div className="pages-row" style={{ marginTop: "5vh" }}>
                                                <div className="pages-col-6">
                                                    <div className="form-input" >

                                                    </div>
                                                </div>
                                                <div className="pages-col-6">
                                                    <div className="form-input">
                                                        <label>Our Hotlines</label>
                                                        <input placeholder="+63 9123456789" readOnly />
                                                        <input placeholder="+63 9987654321" readOnly />
                                                    </div>
                                                </div>
                                            </div>
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

export default Contact;
