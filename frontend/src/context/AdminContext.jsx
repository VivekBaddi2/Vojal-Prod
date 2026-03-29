import { createContext, useContext, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (data) => {
    setAdmin({ email: data.email });
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/admin/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}