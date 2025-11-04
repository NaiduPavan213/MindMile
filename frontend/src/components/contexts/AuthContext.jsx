import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  saveToken,
  login as svcLogin,
  register as svcRegister,
  logout as svcLogout,
  logoutUser as svcLogoutUser,
} from "../../services/auth";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from token
  useEffect(() => {
    const token = getToken();
    if (token) {
      // optimistic auth — try to fetch /api/auth/me to get user details
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => {
          if (!r.ok) throw new Error("Not authenticated");
          return r.json();
        })
        .then((data) => {
          setUser(data.user || null);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // token invalid or backend not available — treat as unauthenticated
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = async (email, password) => {
    const res = await svcLogin(email, password);
    if (res && res.token) {
      saveToken(res.token);
      setUser(res.user || null);
      setIsAuthenticated(true);
      return res;
    }
    throw new Error("Login failed");
  };

  const register = async (name, email, password) => {
    const res = await svcRegister(name, email, password);
    if (res && res.token) {
      saveToken(res.token);
      setUser(res.user || null);
      setIsAuthenticated(true);
      return res;
    }
    throw new Error("Registration failed");
  };

  const logout = async () => {
    // Call backend (if available) and clear tokens
    try {
      await svcLogoutUser();
    } catch (e) {
      // fallback to local removal
      svcLogout();
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
