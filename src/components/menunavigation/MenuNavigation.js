import { Link } from "react-router-dom";
import "./menunavigation.css"
import { useContext, useEffect, useState } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' },
];

function MenuNavigation() {
    const [click, setClick] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const handleClick = () => setClick(!click)

    const handleLogout = async () => {
        try {
            await signOut(auth); // Perform logout action
            window.location.reload(); // Refresh the page after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        const getUserRole = async () => {
            if (currentUser) {
                const adminRef = doc(db, "admins", currentUser.uid);
                const teacherRef = doc(db, "teachers", currentUser.uid);
                const studentRef = doc(db, "students", currentUser.uid);

                const adminDoc = await getDoc(adminRef);
                const teacherDoc = await getDoc(teacherRef);
                const studentDoc = await getDoc(studentRef);

                if (adminDoc.exists()) {
                    setUserRole('admin');
                } else if (teacherDoc.exists()) {
                    setUserRole('teacher');
                } else if (studentDoc.exists()) {
                    setUserRole('student');
                }
            }
        };

        getUserRole();
    }, [currentUser]);


    useEffect(() => {
        Aos.init();

    }, [])

    return (
        <div className="menu-container">
            <nav className="menu-nav">
                <p>Menu</p>
                <div className={click ? 'hb-icon-holder active' : 'hb-icon-holder'} onClick={handleClick}>
                    <div className="hb-icon-one"></div>
                    <div className="hb-icon-two"></div>
                    <div className="hb-icon-three"></div>
                </div>
            </nav>
            <div className={click ? 'menu-holder active' : 'menu-holder'} >
                <div className="navbar">
                    {navLinks.map(({ path, label }, index) => (
                        <Link
                            to={path}
                            key={index}
                            className="header-nav-links"
                        >{label}</Link>))}
                    {currentUser ? (
                        <>
                            <Link to="/" onClick={handleLogout} className="header-nav-links">Log Out</Link>
                            {userRole === 'admin' && (
                                <Link to="/admin" className="header-nav-links">Dashboard</Link>
                            )}
                            {userRole === 'teacher' && (
                                <Link to="/teacher" className="header-nav-links">Dashboard</Link>
                            )}
                            {userRole === 'student' && (
                                <Link to="/student" className="header-nav-links">Dashboard</Link>
                            )}
                        </>
                    ) : (
                        <Link to="/login" className="header-nav-links">Sign In</Link>
                    )}
                </div>
            </div>
        </div>

    )
}

export default MenuNavigation;
