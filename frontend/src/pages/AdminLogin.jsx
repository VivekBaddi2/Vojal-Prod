import { useState } from "react";
import axios from "axios";

export default function AdminLogin({ setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:4000/api/admin/login", { email, password });
      setAdmin(data);
      localStorage.setItem("admin", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition">
          Login
        </button>
      </form>
    </div>
  );
}
