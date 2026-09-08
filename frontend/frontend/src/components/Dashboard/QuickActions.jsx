import {
    FaPlus,
    FaUsers,
    FaChartBar,
    FaCog
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

function QuickActions(){

    const navigate=useNavigate();

    return(

        <div className="quick-actions">

            <div
                className="action-card"
                onClick={()=>navigate("/admin/add-campaign")}
            >

                <FaPlus/>

                <h4>Add Campaign</h4>

            </div>

            <div
                className="action-card"
                onClick={()=>navigate("/admin/users")}
            >

                <FaUsers/>

                <h4>Manage Users</h4>

            </div>

            <div
                className="action-card"
                onClick={()=>navigate("/admin/reports")}
            >

                <FaChartBar/>

                <h4>Reports</h4>

            </div>

        </div>

    );

}

export default QuickActions;