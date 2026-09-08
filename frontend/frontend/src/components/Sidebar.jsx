import "./Sidebar.css";
import {
    FaHome,
    FaGraduationCap,
    FaDonate,
    FaUsers,
    FaBook,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>KindBridge</h2>

            <ul>

                <li>
                    <FaHome />
                    Dashboard
                </li>

                <li>
                    <FaGraduationCap />
                    Education Support
                </li>

                <li>
                    <FaDonate />
                    Donations
                </li>

                <li>
                    <FaBook />
                    Success Stories
                </li>

                <li>
                    <FaUsers />
                    Users
                </li>

                <li>
                    <FaCog />
                    Settings
                </li>

                <li>
                    <FaSignOutAlt />
                    Logout
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;