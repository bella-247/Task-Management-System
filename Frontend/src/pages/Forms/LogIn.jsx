import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import MessageBox from "../../components/MessageBox/MessageBox";
import "./Forms.css";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const LogIn = () => {
    const {theme} = useContext(ThemeContext);
    const {registered, setRegistered} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(registered){
            navigate("/dashboard");
        }
    }, [])





    const { loginUser, loading, error } = useAuth();
    const [redirecting, setRedirecting] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: e.target.email.value.trim(),
            password: e.target.password.value.trim(),
        };
        // validate all fields before submitting
        if (Object.values(userData).some((field) => field === "")) {
            setFormError("Please fill in all fields correctly");
            return;
        }
        else{
            setFormError(null)
        }

        try {
            const data = await loginUser(userData);
            if (data) {
                setRegistered(true);
                setRedirecting(true);
                setTimeout(() => { navigate("/dashboard"); }, 1000);
            }

        } catch (err) {
            console.error("LogIn error: ", err);
        }
    };

    const isDisabled = loading || redirecting;

    return (
        <main className={`login-form ${theme}`}>
            {loading && (
                <MessageBox
                    mode="info"
                    content="Processing your request..."
                    resetTrigger={loading}
                />
            )}
            {error && (
                <MessageBox
                    mode="error"
                    content={error}
                    timer={true}
                    resetTrigger={error}
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
                    content="Successfully Logged In, Redirecting to dashboard..."
                    timer={true}
                    resetTrigger={redirecting}
                />
            )}

            <form method="POST" onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <div className="form-group">
                    <label htmlFor="email">Username or Email </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        disabled={isDisabled}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        disabled={isDisabled}
                        required
                    />
                </div>
                <button type="submit" disabled={isDisabled}>
                    Log In
                </button>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </main>
    );
};

export default LogIn;