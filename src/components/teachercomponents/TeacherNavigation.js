import HouseIcon from '@mui/icons-material/House';
import SchoolIcon from '@mui/icons-material/School';
import CreateIcon from '@mui/icons-material/Create';
import QuizIcon from '@mui/icons-material/Quiz';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useState } from "react";
import { Link } from "react-router-dom";


const navLinks = [
    { path: '/teacher/home', label: 'Home', icon: <HouseIcon /> },
    { path: '/teacher/classes', label: 'Classes', icon: <SchoolIcon /> },
    { path: '/teacher/homework', label: 'Homework', icon: <CreateIcon /> },
    { path: '/teacher/quiz', label: 'Quizzes', icon: <QuizIcon /> },
    { path: '/teacher/test', label: 'Unit Test', icon: <HistoryEduIcon /> },
    { path: '/teacher/grades', label: 'Grades', icon: <CreditScoreIcon /> },
    { path: '/teacher/calendar', label: 'Calendar', icon: <CalendarMonthIcon /> },
    { path: '/teacher/profile', label: 'Profile', icon: <AccountCircleIcon /> }
];


function TeacherNavigation() {
    const [activeLink, setActiveLink] = useState('/teacher'); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="db-navigation-container">
            <div className="pages-row db-navigation-holder">
                <div className="pages-col-12">
                    <h1 className="db-navigation-title">H-CAMP</h1>
                </div>
                <div className="pages-col-12">
                    {navLinks.map(({ path, label, icon }, index) => (
                        <nav
                            key={index}
                            className={`db-navigation-links ${activeLink === path ? "active" : ""}`}
                            onClick={() => handleNavClick(path)}
                        >
                            <Link to={path}>{icon}<p>{label}</p></Link>
                        </nav>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default TeacherNavigation;
