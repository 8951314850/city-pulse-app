import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find(u => u.email === email && u.password === password);
    if (existing) {
      setUser(existing);
      localStorage.setItem("currentUser", JSON.stringify(existing));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) return false; // email exists
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
