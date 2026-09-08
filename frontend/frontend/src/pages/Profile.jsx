import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaUserShield,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaDonate,
    FaRupeeSign,
    FaGraduationCap,
    FaEdit,
    FaLock,
    FaSave,
    FaTimes
} from "react-icons/fa";

import {
    getProfile,
    updateProfile,
    changePassword as changePasswordApi
} from "../services/userService";
import { getMyDonations } from "../services/myDonationService";

import "./Profile.css";

function Profile() {

    const [user, setUser] = useState(null);

    const [donations, setDonations] = useState([]);

    const [stats, setStats] = useState({
        totalAmount: 0,
        totalDonations: 0,
        campaignsSupported: 0
    });

    const [editing, setEditing] = useState(false);

    const [passwordOpen, setPasswordOpen] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            phone: "",
            address: "",
            occupation: ""
        });

    const [passwordData, setPasswordData] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const profile =
                await getProfile();

            setUser(profile);

            setFormData({

                name: profile.name || "",

                phone: profile.phone || "",

                address: profile.address || "",

                occupation:
                    profile.occupation || ""

            });

            const donationList = await getMyDonations();
            setDonations(donationList);

            const totalAmount =
                donationList.reduce(

                    (sum, d) =>
                        sum + d.amount,

                    0
                );

            const campaigns =
                new Set(
                    donationList.map(
                        d => d.supportId || d.campaignId
                    )
                ).size;

            setStats({
                totalAmount,
                totalDonations:
                    donationList.length,
                campaignsSupported:
                    campaigns
            });

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = e => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handlePasswordChange = e => {

        setPasswordData({

            ...passwordData,

            [e.target.name]:
                e.target.value

        });

    };

    const saveProfile = async () => {
        try {
            const updatedUser = await updateProfile(formData);

            setUser(updatedUser);
            setFormData({
                name: updatedUser.name || "",
                phone: updatedUser.phone || "",
                address: updatedUser.address || "",
                occupation: updatedUser.occupation || ""
            });
            setEditing(false);
            alert("Profile updated successfully.");
        } catch (err) {
            console.error("Profile update failed", err);
            alert("Unable to update profile. Please try again.");
        }
    };

    const changePassword = async () => {
        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await changePasswordApi({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            if (response.message !== "Password Updated Successfully") {
                alert(response.message || "Password update failed.");
                return;
            }

            alert(response.message);
            setPasswordOpen(false);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (err) {
            console.error("Password change failed", err);
            alert(
                err.response?.data?.message ||
                "Unable to change password. Please try again."
            );
        }
    };

    if (!user)

        return (

            <div className="loading">

                Loading Profile...

            </div>

        );

    return (

        <div className="profile-page">

            {/* HEADER */}

            <div className="profile-header">

                <div className="profile-left">

                    <FaUserCircle className="avatar"/>

                    <div>

                        <h2>{user.name}</h2>

                        <p>{user.email}</p>

                        <span>

                            Member Since

                            {" "}

                            {user.createdAt ||
                                "2026"}

                        </span>

                    </div>

                </div>

                <div className="profile-buttons">

                    <button

                        className="edit-btn"

                        onClick={()=>

                            setEditing(

                                !editing

                            )

                        }

                    >

                        <FaEdit/>

                        Edit Profile

                    </button>

                    <button

                        className="password-btn"

                        onClick={()=>

                            setPasswordOpen(

                                !passwordOpen

                            )

                        }

                    >

                        <FaLock/>

                        Change Password

                    </button>

                </div>

            </div>

            {/* IMPACT */}

            <div className="impact-grid">

                <div className="impact-card">

                    <FaRupeeSign/>

                    <h2>

                        ₹

                        {stats.totalAmount}

                    </h2>

                    <p>

                        Total Donated

                    </p>

                </div>

                <div className="impact-card">

                    <FaDonate/>

                    <h2>

                        {stats.totalDonations}

                    </h2>

                    <p>

                        Donations

                    </p>

                </div>

                <div className="impact-card">

                    <FaGraduationCap/>

                    <h2>

                        {stats.campaignsSupported}

                    </h2>

                    <p>

                        Campaigns Supported

                    </p>

                </div>

                <div className="impact-card">

                    🏆

                    <h2>

                        Gold

                    </h2>

                    <p>

                        Donor Level

                    </p>

                </div>

            </div>

                        {/* PERSONAL INFORMATION */}

            <div className="profile-section">

                <div className="section-header">

                    <h3>Personal Information</h3>

                </div>

                <div className="info-grid">

                    <div className="info-item">

                        <FaUserCircle className="info-icon"/>

                        <div>

                            <label>Full Name</label>

                            <p>{user.name}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaEnvelope className="info-icon"/>

                        <div>

                            <label>Email</label>

                            <p>{user.email}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaPhone className="info-icon"/>

                        <div>

                            <label>Phone</label>

                            <p>{user.phone || "Not Available"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaUserShield className="info-icon"/>

                        <div>

                            <label>Role</label>

                            <p>{user.role || "USER"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaCalendarAlt className="info-icon"/>

                        <div>

                            <label>Member Since</label>

                            <p>{user.createdAt || "2026"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaMapMarkerAlt className="info-icon"/>

                        <div>

                            <label>Address</label>

                            <p>{user.address || "Not Added"}</p>

                        </div>

                    </div>

                </div>

            </div>

            {/* EDIT PROFILE */}

            {editing && (

                <div className="profile-section">

                    <div className="section-header">

                        <h3>Edit Profile</h3>

                    </div>

                    <div className="form-grid">

                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            placeholder="Full Name"

                            onChange={handleChange}

                        />

                        <input

                            type="text"

                            name="phone"

                            value={formData.phone}

                            placeholder="Phone"

                            onChange={handleChange}

                        />

                        <input

                            type="text"

                            name="occupation"

                            value={formData.occupation}

                            placeholder="Occupation"

                            onChange={handleChange}

                        />

                        <input

                            type="text"

                            name="address"

                            value={formData.address}

                            placeholder="Address"

                            onChange={handleChange}

                        />

                    </div>

                    <div className="action-buttons">

                        <button

                            className="save-btn"

                            onClick={saveProfile}

                        >

                            <FaSave/>

                            Save Changes

                        </button>

                        <button

                            className="cancel-btn"

                            onClick={() => setEditing(false)}

                        >

                            <FaTimes/>

                            Cancel

                        </button>

                    </div>

                </div>

            )}

            {/* CHANGE PASSWORD */}

            {passwordOpen && (

                <div className="profile-section">

                    <div className="section-header">

                        <h3>Change Password</h3>

                    </div>

                    <div className="form-grid">

                        <input

                            type="password"

                            name="currentPassword"

                            placeholder="Current Password"

                            value={passwordData.currentPassword}

                            onChange={handlePasswordChange}

                        />

                        <input

                            type="password"

                            name="newPassword"

                            placeholder="New Password"

                            value={passwordData.newPassword}

                            onChange={handlePasswordChange}

                        />

                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirm Password"

                            value={passwordData.confirmPassword}

                            onChange={handlePasswordChange}

                        />

                    </div>

                    <div className="action-buttons">

                        <button

                            className="save-btn"

                            onClick={changePassword}

                        >

                            <FaLock/>

                            Update Password

                        </button>

                    </div>

                </div>

            )}

            {/* RECENT DONATIONS */}

            <div className="profile-section">

                <div className="section-header">

                    <h3>Recent Donations</h3>

                </div>

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Campaign</th>

                                <th>Amount</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {donations.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="3"
                                        style={{
                                            textAlign:"center"
                                        }}
                                    >

                                        No Donations Yet

                                    </td>

                                </tr>

                            ) : (

                                donations.slice(0,5).map(

                                    donation => (

                                        <tr
                                            key={donation.id}
                                        >

                                            <td>

                                                {
                                                    donation.supportTitle ||
                                                    donation.campaignTitle ||
                                                    donation.campaignId ||
                                                    donation.supportId ||
                                                    "Unknown"
                                                }

                                            </td>

                                            <td>

                                                ₹{donation.amount}

                                            </td>

                                            <td>
                                                {
                                                    (() => {
                                                        const rawDate = donation.donatedAt || donation.createdAt || donation.date;
                                                        if (!rawDate) return "-";
                                                        const date = new Date(rawDate);
                                                        return Number.isNaN(date.getTime())
                                                            ? rawDate
                                                            : date.toLocaleDateString("en-IN", {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric"
                                                              });
                                                    })()
                                                }
                                            </td>

                                        </tr>

                                    )

                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Profile;