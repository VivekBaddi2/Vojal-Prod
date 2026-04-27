import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Catalogue from "./pages/Catalogue";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAdmin } from "./context/AdminContext.jsx";


function AppRoutes() {
  const { admin, loading } = useAdmin();
 

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #faf5ff 0%, #fff9f0 100%)" }}
      >
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#7B1F8A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* ── Public Pages ── */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
<Route path="/catalogue" element={<Catalogue />} />
      {/* ── Admin Login ── */}
      <Route
        path="/admin/login"
        element={
          !admin
            ? <AdminLogin />
            : <Navigate to="/admin/dashboard" replace />
        }
      />

      {/* ── Admin Dashboard (protected) ── */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ── Catch all ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}