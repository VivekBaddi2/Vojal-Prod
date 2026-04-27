import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ start true

  // ✅ restore session on refresh

  useEffect(() => {
    const checkAuth = async () => {
      // ✅ Only ping the server if user is actually on an admin page
      if (!window.location.pathname.startsWith("/admin")) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_BASE}/api/admin/verify`, {
          withCredentials: true,
        });
        setAdmin(data);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (data) => {
    setAdmin({ _id: data._id, email: data.email });
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/admin/logout`,
        {},
        { withCredentials: true },
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
