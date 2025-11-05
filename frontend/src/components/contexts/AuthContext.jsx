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
  loading: true, // Added loading state to context
  login: async () => {},
  register: async () => {},
  logout: () => {},
  setUser: () => {}, // Added setUser for direct state updates (e.g., after profile edit)
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // --- Initial Authentication Check ---
  useEffect(() => {
    const token = getToken();

    // Function to handle the authentication check
    const checkAuth = async () => {
      if (token) {
        try {
          // Optimistic auth — fetch user details
          const r = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!r.ok) {
            svcLogout(); // Clear local token if backend rejects it
            throw new Error("Token invalid or expired");
          }

          const data = await r.json();
          setUser(data.user || null);
          setIsAuthenticated(true);
        } catch (e) {
          // Token invalid or backend not available — treat as unauthenticated
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false); // Authentication check is complete
    };

    checkAuth();
  }, []);

  // --- Authentication Functions ---
  const login = async (email, password) => {
    const res = await svcLogin(email, password);
    if (res && res.token) {
      saveToken(res.token);
      // The user object is received here and immediately updates the state
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
      // User object is received and state is updated
      setUser(res.user || null); 
      setIsAuthenticated(true);
      return res;
    }
    throw new Error("Registration failed");
  };

  const logout = async () => {
    try {
      await svcLogoutUser();
    } catch (e) {
      svcLogout();
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // --- Context Value ---
  const contextValue = {
    isAuthenticated,
    user,
    setUser, // Allows external components (like profile edit) to update user data
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Optionally, you can put a loading spinner here while loading is true */}
      {/* {!loading ? children : <div>Loading Application...</div>} */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);