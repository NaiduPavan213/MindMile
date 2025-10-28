import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, logout as authLogout } from "../../services/auth";

// Minimal AuthContext providing `user` and `setUser` plus logout helper.
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // In a real app we'd decode or fetch user details; here we mark presence.
      setUser({ token });
    }
  }, []);

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
