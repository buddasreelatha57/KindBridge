import { useEffect, useState } from "react";
import {
    FaUsers,
    FaDonate,
    FaBook,
    FaRupeeSign,
    FaUserCheck,
    FaCheckCircle
} from "react-icons/fa";

import StatCard from "../components/Dashboard/StatCard";
import QuickActions from "../components/Dashboard/QuickActions";
import { getDashboard } from "../services/adminService";

import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDonations: 0,
        totalDonationAmount: 0,
        activeDonors: 0,
        totalSupports: 0,
        completedSupports: 0,
        totalSuccessStories: 0,
        averageDonation: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStats = async () => {

            try {

                const data = await getDashboard();

                console.log("Dashboard Data:", data);

                setStats(data);

            } catch (error) {

                console.error(
                    "Failed to load admin dashboard",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadStats();

    }, []);

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>Welcome Back 👋</h1>

                <p>
                    Here's a live overview of your KindBridge platform.
                </p>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Total Users"
                    value={
                        loading
                            ? "..."
                            : stats.totalUsers.toLocaleString()
                    }
                    growth="Registered users"
                    icon={<FaUsers />}
                />

                <StatCard
                    title="Active Donors"
                    value={
                        loading
                            ? "..."
                            : stats.activeDonors.toLocaleString()
                    }
                    growth="Unique contributors"
                    icon={<FaUserCheck />}
                />

                <StatCard
                    title="Total Donation Amount"
                    value={
                        loading
                            ? "..."
                            : `₹${stats.totalDonationAmount.toLocaleString()}`
                    }
                    growth="All-time contributions"
                    icon={<FaRupeeSign />}
                />

                <StatCard
                    title="Donations Received"
                    value={
                        loading
                            ? "..."
                            : stats.totalDonations.toLocaleString()
                    }
                    growth="Successful donations"
                    icon={<FaDonate />}
                />

                <StatCard
                    title="Campaigns"
                    value={
                        loading
                            ? "..."
                            : stats.totalSupports.toLocaleString()
                    }
                    growth="Active & completed"
                    icon={<FaBook />}
                />

                <StatCard
                    title="Completed Campaigns"
                    value={
                        loading
                            ? "..."
                            : stats.completedSupports.toLocaleString()
                    }
                    growth="Funding achieved"
                    icon={<FaCheckCircle />}
                />

                <StatCard
                    title="Success Stories"
                    value={
                        loading
                            ? "..."
                            : stats.totalSuccessStories.toLocaleString()
                    }
                    growth="Published stories"
                    icon={<FaBook />}
                />

                <StatCard
                    title="Average Donation"
                    value={
                        loading
                            ? "..."
                            : `₹${stats.averageDonation.toFixed(0)}`
                    }
                    growth="Per donation average"
                    icon={<FaRupeeSign />}
                />

            </div>

            <QuickActions />

        </div>

    );
}

export default AdminDashboard;