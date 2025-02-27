import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./forms.css";

const SignUp = () => {
    const {registerUser} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        console.log("userData", userData);
        await registerUser(userData);
    };


    return (
        <main className="register-form">
            <h1>Sign Up</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>

                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </main>
    );
};

export default SignUp;
