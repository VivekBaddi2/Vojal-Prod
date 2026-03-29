import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../context/AdminContext.jsx";
const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
   const { data } = await axios.post(
  `${API_BASE}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      login(data); // ✅ sets admin in context
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #faf5ff 0%, #fff9f0 100%)", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="w-full max-w-md">
          <div className="mb-5 text-center">
            <Link to="/" className="text-sm font-medium text-[#7B1F8A] hover:underline">
              ← Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-[#f0eadb] p-9 space-y-6"
            style={{ borderTop: "4px solid #7B1F8A" }}>
            <div className="text-center space-y-1">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-semibold text-[#3a0f45]">
                Admin Login
              </h2>
              <p className="text-xs text-gray-400">Access Vojal Admin Dashboard</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg text-center border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@vojal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border-2 border-[#ede0f7] rounded-lg text-sm text-[#3a0f45] outline-none focus:border-[#7B1F8A] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border-2 border-[#ede0f7] rounded-lg text-sm text-[#3a0f45] outline-none focus:border-[#7B1F8A] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7B1F8A] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors disabled:opacity-60 mt-1"
              >
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </form>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-5">
            © {new Date().getFullYear()} Vojal Admin Panel
          </p>
        </div>
      </div>
    </>
  );
}