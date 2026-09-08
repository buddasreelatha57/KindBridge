import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function UserNavbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                <Link to="/dashboard">
                    <h2>KindBridge</h2>
                </Link>

            </div>

            <ul className="navbar-links">

                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>


                <li>
                    <Link to="/dashboard/my-donations">
                        My Donations
                    </Link>
                </li>

                <li>
                    <Link to="/dashboard/profile">
                        Profile
                    </Link>
                </li>

            </ul>

            <div className="navbar-buttons">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default UserNavbar;