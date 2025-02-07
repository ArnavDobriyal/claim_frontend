import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; // You can still include custom styles if needed
import backgroundImage from "./image.png";


const Login = () => {
  const [policyholderId, setPolicyholderId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!policyholderId || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/",
        {
          id: policyholderId,
          password: password,
        },
        {
          headers: {
            "api-key": "12345", 
          },
        }
      );
      const result = response.data;
      if (result === 123) {
        navigate("/admin");
      } else if (result === 321) {
        navigate("/user");
      } else {
        setError("Invalid ID or password");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1000,
      }}
    >
      <div className="card p-4" style={{ maxWidth: "500px", width: "100%" ,maxHeight: "500px",height: "100%", borderRadius:"10px"}}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <div className="card-body" style={{ alignItems: "center", paddingTop: "6rem"}}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Policyholder ID"
            value={policyholderId}
            onChange={(e) => setPolicyholderId(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="btn btn-primary btn-block w-100 mb-3" 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-danger">{error}</p>}
          <p className="text-center">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
