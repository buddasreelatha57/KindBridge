import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-section">

          <h2>KindBridge</h2>

          <p>
            Connecting generous donors with educational opportunities.
            Together we can remove financial barriers and help students
            achieve their dreams.
          </p>

        </div>

        {/* Quick Links */}
        <div className="footer-section">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/supports">Education Support</Link>
          <Link to="/stories">Success Stories</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* Support */}
        <div className="footer-section">

          <h3>Support</h3>

          <Link to="/supports">Donate</Link>
          <Link to="/supports">Scholarships</Link>
          <Link to="/supports">School Fees</Link>
          <Link to="/supports">Books & Study Materials</Link>

        </div>

        {/* Contact */}
        <div className="footer-section">

          <h3>Contact</h3>

          <p>Email</p>
          <span>support@kindbridge.org</span>

          <p>Phone</p>
          <span>+91 98765 43210</span>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © 2026 KindBridge. All Rights Reserved.
        </p>

        <div>

          <a href="#">Privacy Policy</a>

          <a href="#">Terms & Conditions</a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;