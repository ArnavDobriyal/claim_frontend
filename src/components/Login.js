import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

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
                "http://localhost:8000/",
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
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Policyholder ID"
                value={policyholderId}
                onChange={(e) => setPolicyholderId(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p>{error}</p>}
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default Login;
