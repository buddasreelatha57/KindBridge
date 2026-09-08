import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/">
                    <h2>KindBridge</h2>
                </Link>
            </div>

            <ul className="navbar-links">

                <li>
                    <a href="#home">Home</a>
                </li>

                <li>
                    <a href="#about">About</a>
                </li>

                <li>
                    <a href="#supports">Education Support</a>
                </li>

                <li>
                    <a href="#how">How It Works</a>
                </li>

                <li>
                    <a href="#stories">Success Stories</a>
                </li>

                <li>
                    <a href="#faq">FAQ</a>
                </li>

                <li>
                    <a href="#testimonials">Testimonials</a>
                </li>

                <li>
                    <a href="#contact">Contact</a>
                </li>

            </ul>

          

        </nav>
    );
}

export default Navbar;