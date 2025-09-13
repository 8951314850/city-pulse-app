import React, { useState } from "react";
import { useAuth } from "../pages/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (signup(name, email, password)) {
      navigate("/profile");
    } else {
      setError("Email already exists");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        background: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px", color: "#333", fontSize: "2rem" }}>Sign Up</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: "20px",
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={e => setName(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "15px",
            borderRadius: "6px",
            border: "none",
            background: "#30b349",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>

      <p style={{ marginTop: "20px", fontSize: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
