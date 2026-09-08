import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ManageCampaigns.css";

const ManageCampaigns = () => {

    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {

        try {

            const response = await api.get("/campaigns");

            setCampaigns(response.data);

        } catch (error) {

            console.error("Error fetching campaigns", error);

        } finally {

            setLoading(false);

        }

    };

    const handleAddCampaign = () => {

        navigate("/admin/add-campaign");

    };

    const handleEditCampaign = (id) => {

        navigate(`/admin/campaigns/edit/${id}`);

    };

    const deleteCampaign = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/campaigns/${id}`);

            setCampaigns(prev =>
                prev.filter(campaign => campaign.id !== id)
            );

            alert("Campaign deleted successfully.");

        } catch (error) {

            console.error("Delete failed", error);

            alert("Unable to delete campaign.");

        }

    };

    return (

        <div className="manage-campaigns">

            <div className="campaign-header">

                <h1>Manage Campaigns</h1>

                <button
                    className="add-btn"
                    onClick={handleAddCampaign}
                >
                    + Add Campaign
                </button>

            </div>

            <div className="campaign-table">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Target</th>

                            <th>Raised</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td colSpan="7">
                                    Loading campaigns...
                                </td>

                            </tr>

                        ) : campaigns.length === 0 ? (

                            <tr>

                                <td colSpan="7">
                                    No Campaigns Found
                                </td>

                            </tr>

                        ) : (

                            campaigns.map((campaign) => (

                                <tr key={campaign.id}>

                                    <td>{campaign.id}</td>

                                    <td>{campaign.title}</td>

                                    <td>{campaign.category}</td>

                                    <td>
                                        ₹{campaign.targetAmount?.toLocaleString()}
                                    </td>

                                    <td>
                                        ₹{campaign.raisedAmount?.toLocaleString()}
                                    </td>

                                    <td>

                                        <span className={`status ${campaign.status?.toLowerCase()}`}>

                                            {campaign.status}

                                        </span>

                                    </td>

                                    <td>
                                        <div className="actions">
                                            <button className="edit-btn" onClick={() => 
                                                navigate(`/admin/campaigns/edit/${campaign.id}`) }
                                            >Edit</button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteCampaign(campaign.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ManageCampaigns;