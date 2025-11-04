import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/contexts/AuthContext";
import { ModalProvider } from "./components/providers/ModalProvider";
import GlobalModalManager from "./components/common/GlobalModalManager";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/LoginCompact";
import Register from "./components/pages/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login setActivePage={() => {}} />} />
            <Route
              path="/register"
              element={<Register setActivePage={() => {}} />}
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
          <GlobalModalManager />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
);
