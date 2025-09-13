// src/App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home/Home";
import EventDetails from "./screens/EventDetails/EventDetails";
import Profile from "./screens/Profile/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./pages/context/AuthContext";

// PrivateRoute component to protect pages
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// RedirectLoggedIn component to prevent logged-in users from seeing login/signup
function RedirectLoggedIn({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : children;
}

function App() {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => setLanguage(prev => (prev === "en" ? "ar" : "en"));

  return (
    <AuthProvider>
      <div dir={language === "ar" ? "rtl" : "ltr"} style={{ transition: "all 0.3s" }}>
        <Router>
          <Navbar toggleLanguage={toggleLanguage} language={language} />
          <Routes>
            {/* Default route now protected: if not logged in, goes to /login */}
            <Route path="/" element={<PrivateRoute><Home language={language} /></PrivateRoute>} />
            <Route path="/event/:id" element={<PrivateRoute><EventDetails language={language} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile language={language} /></PrivateRoute>} />

            {/* Login/Signup should redirect if already logged in */}
            <Route path="/login" element={<RedirectLoggedIn><Login language={language} /></RedirectLoggedIn>} />
            <Route path="/signup" element={<RedirectLoggedIn><Signup language={language} /></RedirectLoggedIn>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
