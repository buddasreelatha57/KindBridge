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
                        src="https://www.bing.com/images/search?view=detailV2&ccid=%2fmI1Sp6n&id=69FF73D97FD0278AD34D5367CAAA653BC81B71AF&thid=OIP._mI1Sp6n2O51-TpCRbDxygHaD4&mediaurl=https%3a%2f%2fstorage.googleapis.com%2fkinderkrippe%2f2025-06-25%2f1d9af853-51fa-4c94-b14d-e99de9c48298.jpeg&exph=630&expw=1200&q=children+eduav&FORM=IRPRST&ck=D567185EDAE4395178A32EC5B812A283&selectedIndex=1&itb=0"
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