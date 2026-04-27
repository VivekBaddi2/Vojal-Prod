import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../context/AdminContext.jsx";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const token = await executeRecaptcha("admin_login");

      const verify = await axios.post(`${API_BASE}/api/captcha/verify`, {
        token,
      });
      if (!verify.data.success) {
        setError("Bot detected. Please try again.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `${API_BASE}/api/admin/login`,
        { email, password },
        { withCredentials: true },
      );
      login(data);
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
        style={{
          background: "linear-gradient(135deg, #faf5ff 0%, #fff9f0 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="w-full max-w-md">
          <div className="mb-5 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-[#7B1F8A] hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

          <div
            className="bg-white rounded-2xl shadow-lg border border-[#f0eadb] p-9 space-y-6"
            style={{ borderTop: "4px solid #7B1F8A" }}
          >
            <div className="text-center space-y-1">
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-semibold text-[#3a0f45]"
              >
                Admin Login
              </h2>
              <p className="text-xs text-gray-400">
                Access Vojal Admin Dashboard
              </p>
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
                  onFocus={() => setTouched(true)}
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border-2 border-[#ede0f7] rounded-lg text-sm text-[#3a0f45] outline-none focus:border-[#7B1F8A] transition-colors pr-10"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7B1F8A] transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !touched}
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
