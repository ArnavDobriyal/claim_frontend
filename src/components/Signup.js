import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post(
        "https://claim-managmen-1.onrender.com/signup/",
        { name, email, password },
        {
          headers: {
            "api-key": "12345"
          }
        }
      );

      setSignupData(response.data);
      setMessage("Signup successful! Here is your data:");
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError("User already exists. Try a different name, email, or password.");
      } else {
        setError("Signup failed. Please try again.");
      }
      setMessage("");
      setSignupData(null);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card"style={{
        maxWidth:"1000px",
        maxHeight:"1000px",
      }}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button onClick={handleSignup} className="signup-button">
          Sign Up
        </button>
        {message && <p className="success-message">{message}</p>}
        {signupData && (
          <pre className="json-output">
            {JSON.stringify(signupData, null, 2)}
          </pre>
        )}
        {error && <p className="error-message">{error}</p>}
        <p className="link-text">
          Already have an account?{" "}
          <Link to="/" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
