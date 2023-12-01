import "./admincomponents.css"
import HouseIcon from '@mui/icons-material/House';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import React, { useState } from "react";
import { Link } from "react-router-dom";


const navLinks = [
    { path: '/admin/home', label: 'Home', icon: <HouseIcon /> },
    { path: '/admin/courses', label: 'Courses', icon: <SchoolIcon /> },
    { path: '/admin/users', label: 'Users', icon: <AccountBoxIcon /> },
    { path: '/admin/batch', label: 'Batch', icon: <GroupIcon /> },
    { path: '/admin/calendar', label: 'Calendar', icon: <CalendarMonthIcon /> },
    { path: '/admin/profile', label: 'Profile', icon: <AccountCircleIcon /> }
];


function AdminNavigation() {
    const [activeLink, setActiveLink] = useState('/admin'); // Set the default active link
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

export default AdminNavigation;
