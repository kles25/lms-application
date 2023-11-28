import { Link } from "react-router-dom";
import "./footer.css"

function Footer() {
    return (
        <div className="footer-holder">
            <Link target="_blank" to="https://www.facebook.com/">&#102;</Link>
            <Link target="_blank" to="https://www.instagram.com/">&#99;</Link>
            <Link target="_blank" to="https://twitter.com/">&#116;</Link>
            <Link target="_blank" to="https://www.youtube.com/">&#121;</Link>
        </div>
    )
}

export default Footer;
