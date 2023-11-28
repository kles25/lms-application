import { Link } from "react-router-dom";
import "./homenavigation.css"
import { useState } from "react";

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' },
];

function HomeNavigation() {
    const [activeLink, setActiveLink] = useState('/admin'); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="navigation-holder">
            <div className="navbar">
                {navLinks.map(({ path, label }, index) => (
                    <Link
                        to={path}
                        key={index}
                        className={`header-nav-links ${activeLink === path ? "active" : ""}`}
                        onClick={() => handleNavClick(path)}>{label}</Link>))}

            </div>
        </div>
    )
}

export default HomeNavigation;
