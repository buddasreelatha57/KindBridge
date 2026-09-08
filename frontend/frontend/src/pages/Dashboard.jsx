import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    FaHandHoldingHeart,
    FaRupeeSign
} from "react-icons/fa";

import "./Dashboard.css";


function Dashboard() {


    const navigate = useNavigate();


    const [campaigns, setCampaigns] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchCampaigns();

    }, []);




    const fetchCampaigns = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/campaigns"
            );


            setCampaigns(response.data);


        } catch(error) {

            console.log(
                "Error fetching campaigns",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };





    return (

        <div className="dashboard">


            <div className="dashboard-header">


                <h1>
                    Welcome to KindBridge
                </h1>


                <p>
                    Every donation empowers someone's future.
                </p>


            </div>




            <h2 className="dashboard-title">

                Active Donation Campaigns

            </h2>





            {

            loading ?

            <h3>
                Loading campaigns...
            </h3>


            :


            <div className="campaign-grid">



            {
                campaigns.length > 0 ?


                campaigns.map((campaign)=>(



                    <div
                        className="campaign-card"
                        key={campaign.id}
                    >



                        <img

                            src={
                                campaign.imageUrl ||
                                "https://via.placeholder.com/400"
                            }

                            alt={campaign.title}

                        />





                        <div className="campaign-content">



                            <span className="category">

                                {campaign.category}

                            </span>





                            <h3>

                                {campaign.title}

                            </h3>





                            <p>

                                {campaign.description}

                            </p>






                            <div className="amount">


                                <FaRupeeSign />


                                {campaign.raisedAmount || 0}

                                /

                                {campaign.targetAmount}



                            </div>






                            <button

                                onClick={() =>
                                    navigate(
                                        `/donate/${campaign.id}`
                                    )
                                }

                            >

                                <FaHandHoldingHeart />

                                Donate Now


                            </button>



                        </div>



                    </div>


                ))



                :


                <h3>
                    No campaigns available
                </h3>


            }


            </div>


            }



        </div>


    );

}


export default Dashboard;