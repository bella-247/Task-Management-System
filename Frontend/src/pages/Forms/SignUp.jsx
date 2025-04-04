import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MessageBox from "../../components/MessageBox/MessageBox";
import "./Forms.css";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const SignUp = () => {
    const {theme} = useContext(ThemeContext)
    const {registered, setRegistered} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(registered){
            navigate("/dashboard");
        }
    }, [])

    const { registerUser, loading, error } = useAuth();
    const [redirecting, setRedirecting] = useState(false);
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username: e.target.username.value.trim(),
            email: e.target.email.value.trim(),
            password: e.target.password.value.trim(),
        };

        // validate all fields before submitting
        if (Object.values(userData).some((field) => field === "")) {
            setFormError("Please fill in all fields");
            return;
        }
        else{
            setFormError(null)
        }

        try {
            const data = await registerUser(userData);
            if (data) {
                setRegistered(true);
                setRedirecting(true);
                setTimeout(() => { navigate("/dashboard"); }, 1000);
            }

        } catch (err) {
            console.error("SignUp error: ", err);
        }
    };

    const isDisabled = loading || redirecting;

    return (
        <main className={`register-form ${theme}`}>
            {loading && (
                <MessageBox
                    mode="info"
                    content="Processing your request..."
                    key={Date.now()}
                />
            )}
            {error && (
                <MessageBox
                    mode="error"
                    content={error}
                    timer="true"
                    refresher={Date.now()}
                />
            )}

            {formError && (
                <MessageBox
                    mode="warning"
                    content={formError}
                    timer={true}
                    resetTrigger={formError}
                />
            )}

            {redirecting && (
                <MessageBox
                    mode="good"
                    content="Successfully Registered, Redirecting to dashboard..."
                    timer={true}
                    resetTrigger={redirecting}
                />
            )}

            <form method="POST" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        disabled={isDisabled}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        disabled={isDisabled}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        disabled={isDisabled}
                        required
                    />
                </div>

                <button type="submit" disabled={isDisabled}>
                    Sign Up
                </button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </main>
    );
};

export default SignUp;
