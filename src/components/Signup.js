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
        "http://localhost:8000/signup/",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "api-key": "12345",
          },
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
    <div>
      <h2>Sign Up</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>Sign Up</button>
      {message && <p>{message}</p>}
      {signupData && <pre>{JSON.stringify(signupData, null, 2)}</pre>}
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
  