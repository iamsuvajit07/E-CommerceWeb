import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ setIsAuthenticated, setUserId, setCart }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");

    if (userSession) {
      const { userId, expiry } = JSON.parse(userSession);
      const currentTime = new Date().getTime();

      if (currentTime < expiry) {
        setIsAuthenticated(true);
        setUserId(userId);
        navigate("/");
      } else {
        localStorage.removeItem("userSession"); // Remove expired session
      }
    }
  }, [setIsAuthenticated, setUserId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      const user = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes
        localStorage.setItem(
          "userSession",
          JSON.stringify({ userId: user.id, email: user.email, expiry: expiryTime })
        );

        setIsAuthenticated(true);
        setUserId(user.id);

        // Fetch cart data
        fetch(`http://localhost:5000/users/${user.id}`)
          .then((res) => res.json())
          .then((data) => setCart(data.cart || []))
          .catch((err) => console.error("Error fetching cart:", err));

        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    }

    setFormData({ ...formData, password: "" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      const existingUser = users.find((user) => user.email === formData.email);

      if (existingUser) {
        setError("User already exists. Please login.");
      } else {
        const newUser = {
          email: formData.email,
          password: formData.password,
          cart: [],
        };

        const res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        const savedUser = await res.json();
        const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes

        localStorage.setItem(
          "userSession",
          JSON.stringify({ userId: savedUser.id, email: savedUser.email, expiry: expiryTime })
        );

        setIsAuthenticated(true);
        setUserId(savedUser.id);
        setCart([]); // New user starts with an empty cart

        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    }

    setFormData({ ...formData, password: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h1>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="auth-form">
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
