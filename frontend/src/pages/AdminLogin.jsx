import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminLogin({ setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/login",
        { email, password }
      );
      setAdmin(data);
      localStorage.setItem("admin", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md">

        {/* Back to Home */}
        <div className="mb-4 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-blue-900 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-blue-900">
              Admin Login
            </h2>
            <p className="text-sm text-gray-500">
              Access Flowtec Admin Dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@flowtec.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="enter password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-all hover:shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} Flowtec Admin Panel
        </p>
      </div>
    </div>
  );
}
