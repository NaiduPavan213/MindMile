import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginCompact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      if (res && res.token) {
        // persist under requested key and set global user
        try {
          localStorage.setItem("authToken", res.token);
        } catch (e) {
          // ignore storage errors
        }
        if (typeof setUser === "function") setUser(res.user || null);
        navigate("/dashboard");
      } else setError("Login failed");
    } catch (err) {
      setError(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-black/70 border border-white/6 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Please sign in to continue</p>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-white/6 px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-white/6 px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-br from-purple-600 to-violet-500 text-white rounded-md shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-sm text-gray-400"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
