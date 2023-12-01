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
    { path: '/student/home', label: 'Home', icon: <HouseIcon /> },
    { path: '/student/classes', label: 'Classes', icon: <SchoolIcon /> },
    { path: '/student/homework', label: 'Homework', icon: <CreateIcon /> },
    { path: '/student/quiz', label: 'Quizzes', icon: <QuizIcon /> },
    { path: '/student/test', label: 'Unit Test', icon: <HistoryEduIcon /> },
    { path: '/student/grades', label: 'Grades', icon: <CreditScoreIcon /> },
    { path: '/student/calendar', label: 'Calendar', icon: <CalendarMonthIcon /> },
    { path: '/student/profile', label: 'Profile', icon: <AccountCircleIcon /> }
];


function StudentNavigation() {
    const [activeLink, setActiveLink] = useState('/student'); // Set the default active link
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


export default StudentNavigation;
