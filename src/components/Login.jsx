import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true); // 🔹 Flag for Login/Signup
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/users");
            const users = await response.json();

            if (isLogin) {
                // 🔹 LOGIN LOGIC
                const user = users.find(
                    (user) => user.email === formData.email && user.password === formData.password
                );

                if (user) {
                    setIsAuthenticated(true);
                    navigate("/"); // Redirect to Home Page
                } else {
                    setError("Invalid email or password");
                }
            } else {
                // 🔹 SIGNUP LOGIC
                const existingUser = users.find((user) => user.email === formData.email);

                if (existingUser) {
                    setError("User already exists. Please login.");
                } else {
                    await fetch("http://localhost:5000/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: formData.email, password: formData.password }),
                    });

                    setIsAuthenticated(true);
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Try again later.");
        }

        setFormData({ email: "", password: "" });
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h1>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="toggle-auth">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
