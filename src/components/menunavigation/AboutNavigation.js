import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
    { path: '/about/about-us', label: 'About Us' },
    { path: '/about/our-mission', label: 'Our Mission' },
    { path: '/about/what-sets-apart', label: 'What Sets Us Apart' },
    { path: '/about/our-programs', label: 'Our Programs' },
    { path: '/about/join-us', label: 'Join Us' },
];


function AboutNavigation() {
    const [activeLink, setActiveLink] = useState('/about'); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="about-navigation-holder">
            {navLinks.map(({ path, label }, index) => (
                <Link
                    to={path}
                    key={index}
                    className={`about-nav-links ${activeLink === path ? "active" : ""}`}
                    onClick={() => handleNavClick(path)}
                >{label}</Link>))}
        </div>
    )
}

export default AboutNavigation;
