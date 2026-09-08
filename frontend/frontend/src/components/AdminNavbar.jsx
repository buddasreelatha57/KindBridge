import { useEffect, useState } from "react";
import {
    FaBell,
    FaSearch,
    FaUserCircle,
    FaChevronDown,
    FaCog,
    FaSignOutAlt,
    FaUser,
    FaMoon,
    FaSun
} from "react-icons/fa";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import "./AdminNavbar.css";

function AdminNavbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const adminName =
        localStorage.getItem("name") ||
        "Administrator";

    /* -------------------------
        Theme
    --------------------------*/

    const [theme, setTheme] = useState(

        localStorage.getItem("theme") ||

        "light"

    );

    useEffect(() => {

        document.body.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);

    const toggleTheme = () => {

        setTheme(prev =>

            prev === "light"

                ? "dark"

                : "light"

        );

    };

    /* -------------------------
        Notifications
    --------------------------*/

    const [showNotifications, setShowNotifications] =
        useState(false);

    const notifications = [

        {
            id: 1,
            title: "Donation Received",
            message: "A new donation has been made.",
            time: "2 min ago",
            read: false
        },

        {
            id: 2,
            title: "New User",
            message: "A new user joined KindBridge.",
            time: "15 min ago",
            read: false
        },

        {
            id: 3,
            title: "Campaign Approved",
            message: "Scholarship campaign approved.",
            time: "1 hour ago",
            read: true
        }

    ];

    const unreadCount =

        notifications.filter(

            item => !item.read

        ).length;

    /* -------------------------
        Profile Menu
    --------------------------*/

    const [showProfile, setShowProfile] =
        useState(false);

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    /* -------------------------
        Dynamic Title
    --------------------------*/

    const titles = {

        "/admin": "Dashboard",

        "/admin/campaigns":
            "Manage Campaigns",

        "/admin/add-campaign":
            "Add Campaign",

        "/admin/users":
            "Users",

        "/admin/donations":
            "Donations",

        "/admin/reports":
            "Reports",

        "/admin/profile":
            "Profile",

        "/admin/settings":
            "Settings"

    };

    const pageTitle =

        titles[location.pathname] ||

        "Admin Dashboard";

    return (

        <header className="admin-navbar">

            {/* LEFT */}

            <div className="navbar-left">

                <h2>{pageTitle}</h2>

            </div>

            {/* CENTER */}

            <div className="navbar-center">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search..."

                    />

                </div>

            </div>

            {/* RIGHT */}

            <div className="navbar-right">

                {/* Theme */}

                <button

                    className="theme-btn"

                    onClick={toggleTheme}

                >

                    {

                        theme === "light"

                            ?

                            <FaMoon />

                            :

                            <FaSun />

                    }

                </button>

                {/* Notifications */}

                <div className="notification-wrapper">

                    <button

                        className="notification-btn"

                        onClick={() =>

                            setShowNotifications(

                                !showNotifications

                            )

                        }

                    >

                        <FaBell />

                        {

                            unreadCount > 0 &&

                            <span className="badge">

                                {unreadCount}

                            </span>

                        }

                    </button>

                    {

                        showNotifications &&

                        <div className="notification-dropdown">

                            <div className="dropdown-title">

                                Notifications

                            </div>

                            {

                                notifications.map(item => (

                                    <div

                                        key={item.id}

                                        className={

                                            item.read

                                                ?

                                                "notification-item"

                                                :

                                                "notification-item unread"

                                        }

                                    >

                                        <h4>

                                            {item.title}

                                        </h4>

                                        <p>

                                            {item.message}

                                        </p>

                                        <small>

                                            {item.time}

                                        </small>

                                    </div>

                                ))

                            }

                        </div>

                    }

                </div>

                {/* Profile */}

                <div className="profile-wrapper">

                    <div

                        className="admin-profile"

                        onClick={() =>

                            setShowProfile(

                                !showProfile

                            )

                        }

                    >

                        <FaUserCircle className="profile-icon" />

                        <div>

                            <h4>

                                {adminName}

                            </h4>

                            <p>

                                Super Admin

                            </p>

                        </div>

                        <FaChevronDown />

                    </div>

                    {

                        showProfile &&

                        <div className="profile-dropdown">

                            <Link

                                to="/admin/profile"

                            >

                                <FaUser />

                                My Profile

                            </Link>

                            <button

                                onClick={logout}

                            >

                                <FaSignOutAlt />

                                Logout

                            </button>

                        </div>

                    }

                </div>

            </div>

        </header>

    );

}

export default AdminNavbar;