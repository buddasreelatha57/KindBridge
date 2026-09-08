import "./SupportCard.css";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";

function SupportCard({ support }) {

    const navigate = useNavigate();

    const handleDonate = async () => {

        const token = sessionStorage.getItem("token");

        // User not logged in
        if (!token) {

            const confirmLogin = window.confirm(
                "You need to login before making a donation.\n\nClick OK to Login or Cancel to Register."
            );

            if (confirmLogin) {

                // Save donation page
                sessionStorage.setItem(
                    "redirectAfterLogin",
                    `/donate/${support.id}`
                );

                navigate("/login");

            } else {

                navigate("/register");

            }

            return;
        }

        try {

            // Verify token
            await getProfile();

            navigate(`/donate/${support.id}`);

        } catch (error) {

            // Session expired
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("phone");
            sessionStorage.removeItem("role");

            const confirmLogin = window.confirm(
                "Your session has expired.\n\nClick OK to Login or Cancel to Register."
            );

            if (confirmLogin) {

                sessionStorage.setItem(
                    "redirectAfterLogin",
                    `/donate/${support.id}`
                );

                navigate("/login");

            } else {

                navigate("/register");

            }

        }

    };

    const progress = support.requiredAmount
        ? Math.min(
            100,
            (support.collectedAmount / support.requiredAmount) * 100
        )
        : 0;

    return (

        <div className="support-card">

            <img
                src={support.imageUrl}
                alt={support.title}
            />

            <h2>{support.title}</h2>

            <p>{support.description}</p>

            <h4>{support.category}</h4>

            <p>
                ₹{support.collectedAmount} / ₹{support.requiredAmount}
            </p>

            <div className="progress">

                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>

            </div>

            <button onClick={handleDonate}>
                Donate Now
            </button>

        </div>

    );

}

export default SupportCard;