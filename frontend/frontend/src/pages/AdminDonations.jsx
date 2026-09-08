import { useEffect, useState } from "react";
import { getAdminDonationsOverview } from "../services/adminService";

import {
    FaRupeeSign,
    FaHandHoldingHeart,
    FaCheckCircle,
    FaClock,
    FaDownload
} from "react-icons/fa";

import "./AdminDonations.css";


function AdminDonations() {


    const [campaigns, setCampaigns] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchCampaigns();

    }, []);



    const fetchCampaigns = async () => {

        try {

            const response = await getAdminDonationsOverview();

            setCampaigns(response);


        } catch(error){

            console.log(
                "Error fetching donations",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };




    const calculateProgress = (raised,target)=>{

        if(!target) return 0;

        return Math.min(
            100,
            Math.round((raised / target) * 100)
        );

    };




    return (

        <div className="admin-donations">


            <div className="page-header">

                <h1>
                    Donation Overview
                </h1>

                <p>
                    Track campaign funding and donation progress.
                </p>

            </div>

            <div style={{ marginBottom: 12 }}>
                <button className="export-btn" onClick={async () => {
                    try {
                        const blob = await import('../services/adminService').then(m => m.exportDonationsCsv());
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'donation_overview.csv';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    } catch (err) {
                        console.error('Export failed', err);
                        alert('Export failed');
                    }
                }}>
                    <FaDownload /> Export CSV
                </button>
            </div>



            {
                loading ?

                <h3>
                    Loading donations...
                </h3>


                :


                <div className="donation-grid">


                {
                    campaigns.length > 0 ?


                    campaigns.map((campaign)=>(


                        <div
                            className="donation-card"
                            key={campaign.id}
                        >


                            <div className="card-header">


                                <h2>
                                    {campaign.campaignTitle}
                                </h2>


                                <span>
                                    {campaign.category}
                                </span>


                            </div>





                            <div className="money-section">


                                <div className="money-box">


                                    <FaHandHoldingHeart/>


                                    <div>

                                        <small>
                                            Raised
                                        </small>

                                        <h3>
                                            ₹
                                            {
                                                campaign.raisedAmount || 0
                                            }
                                        </h3>

                                    </div>


                                </div>





                                <div className="money-box">


                                    <FaRupeeSign/>


                                    <div>

                                        <small>
                                            Target
                                        </small>

                                        <h3>
                                            ₹
                                            {
                                                campaign.targetAmount
                                            }
                                        </h3>

                                    </div>


                                </div>



                            </div>





                            <div className="progress-area">


                                <div className="progress-bar">


                                    <div

                                    className="progress-fill"

                                    style={{
                                        width:
                                        `${calculateProgress(
                                            campaign.raisedAmount,
                                            campaign.targetAmount
                                        )}%`
                                    }}

                                    >

                                    </div>


                                </div>



                                <p>

                                {
                                    calculateProgress(
                                        campaign.raisedAmount,
                                        campaign.targetAmount
                                    )
                                }

                                % Completed

                                </p>


                            </div>






                            <div className="remaining">


                                {
                                    campaign.raisedAmount >= campaign.targetAmount ?


                                    <div className="completed">

                                        <FaCheckCircle/>

                                        Goal Completed

                                    </div>


                                    :


                                    <div className="need">


                                        <FaClock/>


                                        Need ₹

                                        {
                                            campaign.targetAmount -
                                            (campaign.raisedAmount || 0)
                                        }


                                        more


                                    </div>

                                }


                            </div>





                            <button>

                                View Donations

                            </button>



                        </div>



                    ))


                    :


                    <h3>
                        No donations found
                    </h3>


                }


                </div>

            }


        </div>

    );

}


export default AdminDonations;