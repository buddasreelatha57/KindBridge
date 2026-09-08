import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { loginUser } from "../services/authService";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const images = [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentImage((prev) => (prev + 1) % images.length);

        }, 4000);

        return () => clearInterval(interval);

    }, []);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(form);

            console.log("Login Response:", response);

            const normalizedRole = String(
                response.role || "USER"
            ).trim().toUpperCase();

            // Save session
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("name", response.name || "");
            sessionStorage.setItem("email", response.email || "");
            sessionStorage.setItem("phone", response.phone || "");
            sessionStorage.setItem("role", normalizedRole);

            setSuccess(true);
            setMessage(response.message);

            setTimeout(() => {

                console.log("Role:", normalizedRole);
                console.log(
                    "Redirect:",
                    sessionStorage.getItem("redirectAfterLogin")
                );

                // ADMIN ALWAYS GOES TO ADMIN DASHBOARD
                if (normalizedRole === "ADMIN") {

                    sessionStorage.removeItem("redirectAfterLogin");

                    navigate("/admin");

                    return;

                }

                // USER RETURNS TO ORIGINAL PAGE
                const redirectAfterLogin =
                    sessionStorage.getItem("redirectAfterLogin");

                if (redirectAfterLogin) {

                    sessionStorage.removeItem("redirectAfterLogin");

                    navigate(redirectAfterLogin);

                    return;

                }

                // Default user dashboard
                navigate("/dashboard");

            }, 1500);

        } catch (error) {

            console.error(error);

            setSuccess(false);

            setMessage(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="login-container">

            <div
                className="login-left"
                style={{
                    backgroundImage: `url(${images[currentImage]})`
                }}
            >

                <div className="overlay">

                    <h1>Welcome Back</h1>

                    <h2>KindBridge</h2>

                    <p>
                        Sign in to continue supporting educational
                        causes through KindBridge.
                    </p>

                    <div className="quote">
                        "Together we can change lives through education."
                    </div>

                </div>

            </div>

            <div className="login-right">

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Login</h2>

                    <p className="subtitle">
                        Continue your journey of helping students
                        achieve their dreams.
                    </p>

                    {message && (

                        <div
                            className={
                                success
                                    ? "success-message"
                                    : "error-message"
                            }
                        >
                            {message}
                        </div>

                    )}

                    <div className="login-input-group">

                        <FaEnvelope className="login-input-icon" />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="login-input-group">

                        <FaLock className="login-input-icon" />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <span
                            className="login-eye"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >

                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }

                        </span>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                    <p className="register-link">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Login;