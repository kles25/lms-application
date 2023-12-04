import "./dashboardcomponents.css"
import React, { useContext, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";

function ProfileIcon() {
    const { currentUser } = useContext(AuthContext)
    const [showProfileIcon, setShowProfileIcon] = useState(false)
    const handleIcon = () => setShowProfileIcon(!showProfileIcon)


    return (
        <>
            <img className="tn-profile-pic" alt="avatar" src={currentUser.photoURL} onClick={handleIcon} />
            <div className={showProfileIcon ? 'icon-dropdown active' : 'icon-dropdown'}>
                <Link className="profile-links" to="">
                    <AccountCircleIcon />
                    <p>{currentUser.displayName}</p>
                </Link>
                <Link className="profile-links" to="/">
                    <HomeIcon />
                    <p>Homepage</p>
                </Link>
                <Link className="profile-links">
                    <ExitToAppIcon />
                    <p onClick={() => signOut(auth)} >Log Out</p>
                </Link>

            </div>

        </>
    )
}

export default ProfileIcon;
