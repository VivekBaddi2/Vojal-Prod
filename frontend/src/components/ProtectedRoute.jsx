import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

export default function ProtectedRoute({ children }) {
  const { admin } = useAdmin();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}