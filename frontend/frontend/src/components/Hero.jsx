import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginRequiredModal from "./LoginRequiredModal";
import { getProfile } from "../services/userService";
import heroImage from "../assets/education_hero.jpg";

function Hero() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDonate = async () => {

        const token = sessionStorage.getItem("token");

        if (!token) {

            sessionStorage.setItem(
                "redirectAfterLogin",
                "/donate/featured"
            );

            setShowModal(true);
            return;
        }

        try {

            // Verify token with backend
            await getProfile();

            navigate("/donate/featured");

        } catch (error) {

            // Invalid or expired token
            sessionStorage.removeItem("token");

            setShowModal(true);

        }
    };

    return (
        <>
            <section className="hero">

                <div className="hero-left">

                    <h1>
                        Support Education,
                        <span> Transform Lives</span>
                    </h1>

                    <p>
                        KindBridge connects generous donors with educational
                        causes. Help students by funding school fees,
                        college fees, books, and study materials.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="btn-primary"
                            onClick={handleDonate}
                        >
                            Donate Now
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() =>
                                document
                                    .getElementById("stories")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            Success Stories
                        </button>

                    </div>

                </div>

                <div className="hero-right">

                    <img
                        src={heroImage}
                        alt="Education"
                    />

                </div>

            </section>

            <LoginRequiredModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onLogin={() => navigate("/login")}
                onRegister={() => navigate("/register")}
            />
        </>
    );
}

export default Hero;