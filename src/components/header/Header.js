import { Link } from "react-router-dom";
import "./header.css"
import AnimateCubeLogo from "../animation/AnimatedCubeLogo";




function Header() {

    return (
        <div className="navbar-holder">
            <Link to='/' className="title-logo"><h4>H-CAMP</h4></Link>
            <Link to='/' className="hidden-logo">
                <AnimateCubeLogo />
            </Link>
        </div>
    )
}

export default Header;
