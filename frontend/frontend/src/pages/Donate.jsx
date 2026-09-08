import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaDonate,
  FaUser,
  FaEnvelope,
  FaRupeeSign,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaHeart
} from "react-icons/fa";

import UserNavbar from "../components/UserNavbar";
import "./Donate.css";

function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [isSupport, setIsSupport] = useState(false);
  const [campaignUpdates, setCampaignUpdates] = useState([]);
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);

  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    amount: ""
  });

  useEffect(() => {
    loadCampaign();
    loadProfile();
  }, [id]);

  const loadCampaign = async () => {
    try {
      let selectedCampaign = null;
      let allCampaigns = [];
      let updates = [];
      let supportId = null;
      let isSupportItem = false;

      try {
        const campaignRes = await api.get(`/campaigns/${id}`);
        selectedCampaign = campaignRes.data;
      } catch (error) {
        selectedCampaign = null;
      }

      try {
        const updatesRes = await api.get(`/campaign-updates/${id}`);
        updates = updatesRes.data || [];
      } catch (error) {
        updates = [];
      }

      try {
        const campaignsRes = await api.get("/campaigns");
        allCampaigns = campaignsRes.data || [];
      } catch (error) {
        allCampaigns = [];
      }

      if (!selectedCampaign) {
        const supportRes = await api.get(`/support/${id}`);
        if (supportRes?.data) {
          isSupportItem = true;
          supportId = id;
          selectedCampaign = {
            id: supportRes.data.id,
            title: supportRes.data.title,
            category: supportRes.data.category,
            description: supportRes.data.description,
            story: supportRes.data.description,
            beneficiaryName: supportRes.data.beneficiaryName || supportRes.data.title,
            location: supportRes.data.institution || "Hyderabad, Telangana",
            educationLevel: supportRes.data.category || "Support",
            institutionName: supportRes.data.institution || "Institution",
            targetAmount: supportRes.data.requiredAmount || 0,
            raisedAmount: supportRes.data.collectedAmount || 0,
            imageUrl: supportRes.data.imageUrl || "https://images.unsplash.com/photo-1509062522246-3755977927d7",
            deadline: "N/A"
          };
        }
      }

      if (!selectedCampaign && allCampaigns.length > 0) {
        selectedCampaign = allCampaigns.find((item) => item.id === id) || allCampaigns[0];
      }

      setCampaign(selectedCampaign);
      setIsSupport(isSupportItem);
      setCampaignUpdates(updates || []);
      setRelatedCampaigns(
        (allCampaigns || []).filter((item) => item.id !== selectedCampaign?.id).slice(0, 3)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadProfile = async () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await api.get("/auth/profile");

      setForm({
        donorName: res.data.name,
        donorEmail: res.data.email,
        amount: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const donateAmount = async () => {

    const token = sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const donationPayload = {
        donorName: form.donorName,
        donorEmail: form.donorEmail,
        amount: Number(form.amount)
      };

      if (isSupport) {
        donationPayload.supportId = id;
      } else {
        donationPayload.campaignId = id;
      }

      await api.post("/donations", donationPayload);

      alert("Thank you for your donation ❤️");

      navigate("/dashboard/my-donations");

    } catch (err) {
      console.log(err);
      alert("Donation Failed");
    }
  };

  if (!campaign) {
    return (
      <>
        <UserNavbar />
        <h2 className="loading">
          Loading Campaign...
        </h2>
      </>
    );
  }

  const progress =
    campaign.targetAmount > 0
      ? (campaign.raisedAmount / campaign.targetAmount) * 100
      : 0;

  const beneficiaryName = campaign.beneficiaryName || "Student Beneficiary";
  const beneficiaryLocation = campaign.location || "Hyderabad, Telangana";
  const educationLevel = campaign.educationLevel || "Undergraduate Student";
  const institutionName = campaign.institutionName || "Educational Institution";

  return (
    <>
      <UserNavbar />

      <div className="donate-page">

        <div className="donate-container">

          {/* LEFT */}

          <div className="campaign-section">

            <img
              src={
                campaign.imageUrl ||
                "https://images.unsplash.com/photo-1509062522246-3755977927d7"
              }
              alt={campaign.title}
              className="campaign-image"
            />

            <span className="campaign-category">
              <FaGraduationCap />
              {campaign.category}
            </span>

            <h1>{campaign.title}</h1>

            <p className="campaign-description">
              {campaign.description}
            </p>

            <div className="progress-box">

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`
                  }}
                ></div>

              </div>

              <div className="amount-row">

                <h3>
                  ₹{campaign.raisedAmount}
                </h3>

                <span>
                  Raised of ₹{campaign.targetAmount}
                </span>

              </div>

            </div>

            <div className="campaign-info">

              <div>

                <FaMapMarkerAlt />

                Hyderabad, Telangana

              </div>

              <div>

                <FaCalendarAlt />

                Deadline :
                {campaign.deadline}

              </div>

            </div>

            <div className="story-box">

              <h2>
                About this Campaign
              </h2>

              <p>

                {campaign.story ||

                  `Education changes lives.

This campaign aims to provide financial support to deserving students who cannot continue their education because of financial difficulties.

Your contribution will help cover tuition fees, books, hostel expenses and essential educational resources.

Every donation, big or small, creates an opportunity for a brighter future.`}

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="donation-card">

            <h2>

              <FaDonate />

              Donate Now

            </h2>

            <div className="quick-buttons">

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    amount: 500
                  })
                }
              >
                ₹500
              </button>

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    amount: 1000
                  })
                }
              >
                ₹1000
              </button>

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    amount: 5000
                  })
                }
              >
                ₹5000
              </button>

            </div>

            <div className="input-group">

              <FaUser />

              <input
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                placeholder="Your Name"
              />

            </div>

            <div className="input-group">

              <FaEnvelope />

              <input
                name="donorEmail"
                value={form.donorEmail}
                onChange={handleChange}
                placeholder="Your Email"
              />

            </div>

            <div className="input-group">

              <FaRupeeSign />

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Donation Amount"
              />

            </div>

            <button
              className="donate-btn"
              onClick={donateAmount}
            >

              <FaHeart />

              Donate Securely

            </button>

            <p className="secure">

              <FaShieldAlt />

              SSL Encrypted Secure Donation

            </p>

          </div>

        </div>

        {/* ================= BENEFICIARY ================= */}

<div className="beneficiary-section">

    <h2>Beneficiary Details</h2>

    <div className="beneficiary-card">

        <div className="beneficiary-icon">
            <FaGraduationCap />
        </div>

        <div>

            <h3>
                {beneficiaryName}
            </h3>

            <p>
                This fundraising campaign supports a deserving student in
                continuing higher education.
            </p>

            <ul>

                <li>
                    📍 {beneficiaryLocation}
                </li>

                <li>
                    🎓 {educationLevel}
                </li>

                <li>
                    📚 {institutionName}
                </li>

            </ul>

        </div>

    </div>

</div>



{/* ================= FUND USAGE ================= */}

<div className="usage-section">

    <h2>
        How Your Donation Will Be Used
    </h2>

    <div className="usage-grid">

        <div className="usage-card">
            🎓
            <h3>Tuition Fees</h3>
            <p>
                Pay college or school tuition fees.
            </p>
        </div>

        <div className="usage-card">
            📚
            <h3>Books</h3>
            <p>
                Purchase textbooks and study materials.
            </p>
        </div>

        <div className="usage-card">
            💻
            <h3>Laptop</h3>
            <p>
                Support digital education.
            </p>
        </div>

        <div className="usage-card">
            🏠
            <h3>Hostel</h3>
            <p>
                Cover accommodation expenses.
            </p>
        </div>

    </div>

</div>



{/* ================= CAMPAIGN UPDATES ================= */}

<div className="updates-section">

    <h2>
        Campaign Updates
    </h2>

    {campaignUpdates.length > 0 ? (
        campaignUpdates.map((update) => (
            <div className="update-item" key={update.id}>
                <span>
                    {update.createdAt
                        ? new Date(update.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric"
                        })
                        : "Latest"}
                </span>
                <h4>{update.title}</h4>
                <p>{update.description}</p>
            </div>
        ))
    ) : (
        <p>No updates available for this campaign yet.</p>
    )}

</div>



{/* ================= RELATED CAMPAIGNS ================= */}

<div className="related-section">

    <h2>
        Related Campaigns
    </h2>

    {relatedCampaigns.length > 0 ? (
        <div className="related-grid">
            {relatedCampaigns.map((relatedCampaign) => (
                <div className="related-card" key={relatedCampaign.id}>
                    <img
                        src={relatedCampaign.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"}
                        alt={relatedCampaign.title}
                    />

                    <h3>{relatedCampaign.title}</h3>

                    <button onClick={() => navigate(`/donate/${relatedCampaign.id}`)}>
                        View Campaign
                    </button>
                </div>
            ))}
        </div>
    ) : (
        <p>No other campaigns available right now.</p>
    )}

</div>

</div>

</>
);

}

export default Donate;