import { useEffect, useState } from "react";
import { FaDonate, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { getMyDonations } from "../services/myDonationService";

import "./MyDonations.css";

function MyDonations() {

    const [donations, setDonations] = useState([]);

    const loadDonations = async () => {

        try {

            const data = await getMyDonations();

            setDonations(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        let isMounted = true;

        const fetchDonations = async () => {
            try {
                const data = await getMyDonations();

                if (isMounted) {
                    setDonations(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDonations();

        return () => {
            isMounted = false;
        };
    }, []);

    const totalAmount = donations.reduce(
        (sum, donation) => sum + donation.amount,
        0
    );

    return (

        <div className="mydonations">

            <h1>My Donations</h1>

            <div className="summary-card">

                <div>
                    <h2>₹{totalAmount}</h2>
                    <p>Total Donated</p>
                </div>

                <div>
                    <h2>{donations.length}</h2>
                    <p>Total Donations</p>
                </div>

            </div>

            {donations.length === 0 ? (

                <div className="empty">

                    <FaDonate size={70} />

                    <h2>No Donations Yet</h2>

                    <p>Start supporting students today ❤️</p>

                </div>

            ) : (

                <div className="donation-list">

                    {donations.map((donation) => (

                        <div
                            className="donation-card"
                            key={donation.id}
                        >

                            <div className="top">

                                <FaDonate className="icon" />

                                <h3>Donation</h3>

                            </div>

                            <p>
                                <FaRupeeSign />
                                <strong>{donation.amount}</strong>
                            </p>

                            <p>
                                <strong>Donor:</strong> {donation.donorName}
                            </p>

                            <p>
                                <strong>Email:</strong> {donation.donorEmail}
                            </p>

                            <p>
                                <strong>Support ID:</strong> {donation.supportId}
                            </p>

                            <p className="date">

                                <FaCalendarAlt />

                                {" "}

                                {donation.createdAt
                                    ? new Date(donation.createdAt).toLocaleDateString()
                                    : "Completed"}

                            </p>

                            <span className="status">
                                Completed
                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default MyDonations;