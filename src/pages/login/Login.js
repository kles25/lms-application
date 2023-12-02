import "./login.css"
import AnimatedWaves from "../../components/animation/AnimatedWaves";
import AnimateCube from "../../components/animation/AnimatedCube";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";

function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const adminRef = doc(db, "admins", user.uid);
            const teacherRef = doc(db, "teachers", user.uid);
            const studentRef = doc(db, "students", user.uid);

            const adminDoc = await getDoc(adminRef);
            const teacherDoc = await getDoc(teacherRef);
            const studentDoc = await getDoc(studentRef);

            let userRole = '';

            if (adminDoc.exists()) {
                userRole = 'admin';
            } else if (teacherDoc.exists()) {
                userRole = 'teacher';
            } else if (studentDoc.exists()) {
                userRole = 'student';
            }

            // Redirect based on the user's role
            if (userRole === 'admin') {
                navigate('/admin');
            } else if (userRole === 'teacher') {
                navigate('/teacher');
            } else if (userRole === 'student') {
                navigate('/student');
            }


        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
            <AnimatedWaves />
            <div className="animate-cube-holder">
                <AnimateCube></AnimateCube>
            </div>
            <div className="login-background">
                <section className="login-container">
                    <div className="pages-row">
                        <div className="pages-col-8">
                            <div className="hero-img"
                                data-aos="zoom-in"
                                data-aos-duration="3000"
                                data-aos-offset="300"
                                data-aos-easing="ease-in-sine">
                            </div>
                        </div>
                        <div className="pages-col-4">
                            <div className="login-holder">
                                <h3>Sign In</h3>
                                <form onSubmit={handleLogin}>
                                    <label>E-mail</label>
                                    <input type="email" onChange={e => setEmail(e.target.value)} />
                                    <label>Password</label>
                                    <input type="password" onChange={e => setPassword(e.target.value)} />
                                    <button>Submit</button>
                                    {error && <span>Wrong email or password</span>}
                                </form>
                                <div className="pages-row">
                                    {/* <div className="pages-col-6">
                                        <p><Link to="">Enroll now</Link> and Get your Account</p>
                                    </div> */}
                                    <div className="pages-col-6">
                                        <p>Go back and visit other <Link to="/">features</Link> </p>
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

export default Login;
