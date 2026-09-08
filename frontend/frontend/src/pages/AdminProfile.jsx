import {
    FaUserShield,
    FaEnvelope,
    FaCalendarAlt,
    FaLock,
    FaBell,
    FaMoon,
    FaSignOutAlt,
    FaCog
} from "react-icons/fa";

import "./AdminProfile.css";


function AdminProfile(){


    const admin = {

        name:"Admin",

        email:"admin@kindbridge.com",

        role:"Super Admin",

        joined:"23 July 2026",

        image:"https://ui-avatars.com/api/?name=Admin&background=0fb3a0&color=fff"

    };


    return(

        <div className="admin-profile-page">


            <div className="profile-header">

                <FaCog/>

                <h2>
                    Admin Profile & Settings
                </h2>

            </div>



            <div className="profile-layout">



                {/* Profile Card */}

                <div className="profile-card">


                    <img
                        src={admin.image}
                        alt="Admin"
                    />


                    <h1>
                        {admin.name}
                    </h1>



                    <span className="role">

                        <FaUserShield/>

                        {admin.role}

                    </span>




                    <div className="profile-details">


                        <div>

                            <FaEnvelope/>

                            <p>
                                {admin.email}
                            </p>

                        </div>



                        <div>

                            <FaCalendarAlt/>

                            <p>
                                Joined {admin.joined}
                            </p>

                        </div>


                    </div>




                    <button className="password-btn">

                        <FaLock/>

                        Change Password

                    </button>



                </div>





                {/* Settings Card */}

                <div className="settings-card">


                    <h2>

                        Account Settings

                    </h2>




                    <div className="setting-item">


                        <div>

                            <FaBell/>

                            <span>
                                Email Notifications
                            </span>

                        </div>



                        <label className="switch">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="slider"></span>

                        </label>


                    </div>






                    <div className="setting-item">


                        <div>

                            <FaMoon/>

                            <span>
                                Dark Mode
                            </span>

                        </div>



                        <label className="switch">

                            <input
                                type="checkbox"
                            />

                            <span className="slider"></span>

                        </label>


                    </div>






                    <div className="setting-item">


                        <div>

                            <FaLock/>

                            <span>
                                Two Factor Authentication
                            </span>

                        </div>



                        <label className="switch">

                            <input
                                type="checkbox"
                            />

                            <span className="slider"></span>

                        </label>


                    </div>






                    <button className="logout-btn">


                        <FaSignOutAlt/>

                        Logout


                    </button>



                </div>



            </div>


        </div>

    );

}


export default AdminProfile;