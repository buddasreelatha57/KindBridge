import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    FaBullhorn,
    FaImage,
    FaRupeeSign,
    FaAlignLeft,
    FaUserGraduate,
    FaMapMarkerAlt,
    FaUniversity,
    FaCalendarAlt,
    FaCheckCircle
} from "react-icons/fa";

import "./AddCampaign.css";

function AddCampaign() {

    const navigate = useNavigate();

    const [campaign, setCampaign] = useState({

        // Campaign
        title: "",
        category: "",
        description: "",
        story: "",

        // Beneficiary
        beneficiaryName: "",
        beneficiaryAge: "",
        location: "",
        educationLevel: "",
        institutionName: "",

        // Fund
        targetAmount: "",
        raisedAmount: 0,

        // Media
        imageUrl: "",

        // Campaign
        deadline: "",
        status: "ACTIVE",
        verified: false

    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setCampaign(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/campaigns", campaign);

            alert("Campaign created successfully!");

            navigate("/admin/campaigns");

        } catch (error) {

            console.log(error);

            alert("Failed to create campaign.");

        }

    };

    return (

        <div className="add-campaign-page">

            <div className="page-header">

                <h1>Create New Campaign</h1>

                <p>
                    Create an education fundraising campaign for students.
                </p>

            </div>

            <div className="campaign-layout">

                {/* ================= FORM ================= */}

                <div className="campaign-form-card">

                    <form onSubmit={handleSubmit}>

                        {/* ================= Campaign Information ================= */}

                        <div className="form-section">

                            <h2>
                                <FaBullhorn />
                                Campaign Information
                            </h2>

                            <label>Campaign Title</label>

                            <input
                                type="text"
                                name="title"
                                value={campaign.title}
                                onChange={handleChange}
                                placeholder="Help Rahul Complete Engineering"
                                required
                            />

                            <label>Category</label>

                            <select
                                name="category"
                                value={campaign.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option>Scholarship</option>
                                <option>School Fees</option>
                                <option>College Fees</option>
                                <option>Books</option>
                                <option>Hostel Fees</option>
                                <option>Laptop</option>
                                <option>Education Support</option>

                            </select>

                            <label>Short Description</label>

                            <textarea

                                name="description"

                                value={campaign.description}

                                onChange={handleChange}

                                rows="3"

                                placeholder="Brief description..."

                            />

                            <label>Campaign Story</label>

                            <textarea

                                name="story"

                                value={campaign.story}

                                onChange={handleChange}

                                rows="8"

                                placeholder="Explain the beneficiary's story, family background, financial situation and why support is needed."

                            />

                        </div>



                        {/* ================= Beneficiary Information ================= */}

                        <div className="form-section">

                            <h2>

                                <FaUserGraduate />

                                Beneficiary Information

                            </h2>

                            <label>Beneficiary Name</label>

                            <input

                                type="text"

                                name="beneficiaryName"

                                value={campaign.beneficiaryName}

                                onChange={handleChange}

                                placeholder="Student Name"

                                required

                            />

                            <label>Age</label>

                            <input

                                type="number"

                                name="beneficiaryAge"

                                value={campaign.beneficiaryAge}

                                onChange={handleChange}

                                placeholder="18"

                            />

                            <label>

                                <FaMapMarkerAlt />

                                Location

                            </label>

                            <input

                                type="text"

                                name="location"

                                value={campaign.location}

                                onChange={handleChange}

                                placeholder="Hyderabad, Telangana"

                            />

                            <label>Education Level</label>

                            <select

                                name="educationLevel"

                                value={campaign.educationLevel}

                                onChange={handleChange}

                            >

                                <option value="">
                                    Select Education
                                </option>

                                <option>School</option>

                                <option>Intermediate</option>

                                <option>Diploma</option>

                                <option>B.Tech</option>

                                <option>Degree</option>

                                <option>Post Graduation</option>

                            </select>

                            <label>

                                <FaUniversity />

                                Institution Name

                            </label>

                            <input

                                type="text"

                                name="institutionName"

                                value={campaign.institutionName}

                                onChange={handleChange}

                                placeholder="ABC Engineering College"

                            />

                        </div>

                                                {/* ================= Fund Details ================= */}

                        <div className="form-section">

                            <h2>
                                <FaRupeeSign />
                                Fund Details
                            </h2>

                            <label>Target Amount (₹)</label>

                            <input
                                type="number"
                                name="targetAmount"
                                value={campaign.targetAmount}
                                onChange={handleChange}
                                placeholder="500000"
                                required
                            />

                            <label>
                                <FaCalendarAlt />
                                Campaign Deadline
                            </label>

                            <input
                                type="date"
                                name="deadline"
                                value={campaign.deadline}
                                onChange={handleChange}
                                required
                            />

                            <label>Status</label>

                            <select
                                name="status"
                                value={campaign.status}
                                onChange={handleChange}
                            >

                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>

                                <option value="CLOSED">
                                    CLOSED
                                </option>

                            </select>

                        </div>



                        {/* ================= Campaign Image ================= */}

                        <div className="form-section">

                            <h2>
                                <FaImage />
                                Campaign Cover
                            </h2>

                            <label>Image URL</label>

                            <input
                                type="text"
                                name="imageUrl"
                                value={campaign.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />

                        </div>



                        {/* ================= Verification ================= */}

                        <div className="form-section">

                            <h2>

                                <FaCheckCircle />

                                Verification

                            </h2>

                            <label className="checkbox">

                                <input
                                    type="checkbox"
                                    name="verified"
                                    checked={campaign.verified}
                                    onChange={handleChange}
                                />

                                Verified Campaign

                            </label>

                        </div>



                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Create Campaign
                        </button>

                    </form>

                </div>



                {/* ================= LIVE PREVIEW ================= */}

                {/* ================= PREVIEW ================= */}

<div className="preview-card">

    <h3>Campaign Preview</h3>

    <div className="image-preview">

        {campaign.imageUrl ? (

            <img
                src={campaign.imageUrl}
                alt="Campaign"
            />

        ) : (

            <div className="placeholder">

                Campaign Image

            </div>

        )}

    </div>

    <h2>

        {campaign.title || "Campaign Title"}

    </h2>

    <span className="preview-category">

        {campaign.category || "Category"}

    </span>

    <div className="preview-beneficiary">

        <img

            src={
                campaign.beneficiaryImage ||
                "https://ui-avatars.com/api/?name=Beneficiary"
            }

            alt="Beneficiary"

        />

        <div>

            <strong>

                {campaign.beneficiaryName || "Beneficiary Name"}

            </strong>

            <p>

                {campaign.beneficiaryAge || "--"} Years

            </p>

            <small>

                📍 {campaign.location || "Location"}

            </small>

        </div>

    </div>

    <div className="preview-story">

        <h4>Story</h4>

        <p>

            {campaign.story ||
                "The campaign story will appear here..."}

        </p>

    </div>

    <div className="preview-amount">

        ₹ {campaign.targetAmount || 0}

    </div>

    <div className="verification">

        {campaign.verified ? (

            <span className="verified">

                ✔ Verified Campaign

            </span>

        ) : (

            <span className="pending">

                Pending Verification

            </span>

        )}

    </div>

    {campaign.featured && (

        <div className="featured">

            ⭐ Featured Campaign

        </div>

    )}

    {campaign.urgent && (

        <div className="urgent">

            🚨 Urgent Campaign

        </div>

    )}

</div>

        </div>

    </div>

);

};

export default AddCampaign;