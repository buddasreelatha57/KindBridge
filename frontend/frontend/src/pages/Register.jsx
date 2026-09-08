import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { registerUser } from "../services/authService";
import "./Register.css";


function Register() {

    const navigate = useNavigate();

    const images = [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200"
    ];


    const [currentImage, setCurrentImage] = useState(0);

    const [showPassword, setShowPassword] = useState(false);


    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });


    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);



    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentImage(
                (prev) => (prev + 1) % images.length
            );

        }, 4000);


        return () => clearInterval(interval);

    }, []);



    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await registerUser(form);


            setSuccess(true);
            setMessage(response.message);



            setTimeout(() => {

                navigate("/login");

            }, 2000);


        } catch (error) {


            setSuccess(false);


            setMessage(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };




    return (

        <div className="register-container">


            {/* LEFT SIDE */}

            <div
                className="register-left"
                style={{
                    backgroundImage:
                        `url(${images[currentImage]})`
                }}
            >

                <div className="register-overlay">


                    <h1>
                        Welcome to
                    </h1>


                    <h2>
                        KindBridge
                    </h2>


                    <p>
                        Create your free account and become part
                        of a community dedicated to empowering
                        students through education and opportunity.
                    </p>


                    <div className="register-quote">

                        "Together, every contribution builds a
                        brighter future."

                    </div>


                </div>


            </div>




            {/* RIGHT SIDE */}


            <div className="register-right">


                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >


                    <h2>
                        Create Account
                    </h2>



                    <p className="register-subtitle">

                        Join KindBridge and start making a
                        meaningful impact on students' lives.

                    </p>




                    {
                        message && (

                            <div
                                className={
                                    success
                                        ? "register-success-message"
                                        : "register-error-message"
                                }
                            >

                                {message}

                            </div>

                        )
                    }






                    {/* NAME */}


                    <div className="register-input-group">

                        <FaUser className="register-input-icon" />


                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                    </div>







                    {/* EMAIL */}


                    <div className="register-input-group">


                        <FaEnvelope className="register-input-icon" />


                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />


                    </div>








                    {/* PHONE */}



                    <div className="register-input-group">


                        <FaPhone className="register-input-icon" />


                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />


                    </div>









                    {/* PASSWORD */}



                    <div className="register-input-group">


                        <FaLock className="register-input-icon" />



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
                            className="register-password-eye"
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
                        className="register-btn"
                        type="submit"
                    >

                        Create Account

                    </button>







                    <p className="register-login-link">


                        Already have an account?


                        <Link to="/login">

                            Login

                        </Link>


                    </p>





                </form>



            </div>




        </div>

    );

}


export default Register;