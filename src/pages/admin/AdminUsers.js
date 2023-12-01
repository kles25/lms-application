import { Link, Outlet } from "react-router-dom";
import "./admindashboard.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

const navLinks = [
    { path: '/admin/users/admins', label: 'Admin' },
    { path: '/admin/users/teachers', label: 'Teachers' },
    { path: '/admin/users/students', label: 'Students' },
];

function AdminUser() {

    const [activeLink, setActiveLink] = useState('/admin/users'); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };
    return (
        <>
            <div className="db-header-holder">
                <h3 className="db-title">Users</h3>
                <Link className="db-links" to='/admin/adduser'><h3 className="db-title">Add Profile</h3><ArrowForwardIosIcon /></Link>
            </div>
            <div className="user-data-links">
                {navLinks.map(({ path, label }, index) => (
                    <Link to={path}
                        key={index}
                        className={`db-users-links ${activeLink === path ? "active" : ""}`}
                        onClick={() => handleNavClick(path)}><nav>{label}</nav></Link>
                ))}
            </div>
            <Outlet />
        </>
    )
}

export default AdminUser;
