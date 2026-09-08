import "./LoginRequiredModal.css";

function LoginRequiredModal({
    isOpen,
    onClose,
    onLogin,
    onRegister
}) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            <div className="login-modal">

                <h2>🔒 Login Required</h2>

                <p>
                    Please login or create an account
                    to make a donation.
                </p>

                <div className="modal-buttons">

                    <button
                        className="login-btn"
                        onClick={onLogin}
                    >
                        Login
                    </button>

                    <button
                        className="register-btn"
                        onClick={onRegister}
                    >
                        Register
                    </button>

                </div>

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>
    );
}

export default LoginRequiredModal;