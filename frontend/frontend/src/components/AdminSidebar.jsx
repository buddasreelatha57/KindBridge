import {
    FaTachometerAlt,
    FaGraduationCap,
    FaPlusCircle,
    FaDonate,
    FaUsers,
    FaChartLine,
    FaUserCircle,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <aside className="admin-sidebar">

            <div className="admin-logo">

                <h2>KindBridge</h2>

                <span>Admin Panel</span>

            </div>

            <nav>

                <NavLink to="/admin" end>

                    <FaTachometerAlt />

                    Dashboard

                </NavLink>

                <NavLink to="/admin/campaigns">

                    <FaGraduationCap />

                    Campaigns

                </NavLink>

                <NavLink to="/admin/add-campaign">

                    <FaPlusCircle />

                    Add Campaign

                </NavLink>

                <NavLink to="/admin/donations">

                    <FaDonate />

                    Donations

                </NavLink>

                <NavLink to="/admin/users">

                    <FaUsers />

                    Users

                </NavLink>

                <NavLink to="/admin/reports">

                    <FaChartLine />

                    Reports

                </NavLink>

                <NavLink to="/admin/profile">

                    <FaUserCircle />

                    Profile

                </NavLink>

                

            </nav>

            <button
                className="logout"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default AdminSidebar;