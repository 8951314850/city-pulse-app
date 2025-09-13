import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext";

export default function Navbar({ toggleLanguage, language }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Simple translation dictionary
  const labels = {
    home: language === "ar" ? "الرئيسية" : "Home",
    profile: language === "ar" ? "الملف الشخصي" : "Profile",
    login: language === "ar" ? "تسجيل الدخول" : "Login",
    signup: language === "ar" ? "إنشاء حساب" : "Sign Up",
    logout: language === "ar" ? "تسجيل الخروج" : "Logout",
    hi: language === "ar" ? "مرحبا" : "Hi",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 20px",
        background: "#30b349",
        color: "#333",
        margin: 0,
      }}
    >
      <div>
        <Link to="/" style={{ color: "#333", textDecoration: "none", marginRight: "15px", fontWeight: "bold" }}>
          {labels.home}
        </Link>
        {user && (
          <Link to="/profile" style={{ color: "#333", textDecoration: "none", fontWeight: "bold" }}>
            {labels.profile}
          </Link>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "1px solid #333",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {language === "en" ? "EN" : "AR"}
        </button>

        {!user ? (
          <>
            <Link to="/login" style={{ color: "#333", textDecoration: "none", marginRight: "10px" }}>
              {labels.login}
            </Link>
            <Link to="/signup" style={{ color: "#333", textDecoration: "none" }}>
              {labels.signup}
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>{labels.hi}, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {labels.logout}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
