import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) return null; // wait for auth check

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}