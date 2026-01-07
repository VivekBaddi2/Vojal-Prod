import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const [admin, setAdmin] = useState(null);

  // Load admin session from localStorage
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  }, []);

  return (
    <Router>
      {/* Show Navbar only for public pages */}
      {!window.location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Pages */}
        <Route
          path="/admin/login"
          element={!admin ? <AdminLogin setAdmin={setAdmin} /> : <Navigate to="/admin/dashboard" />}
        />
        <Route
          path="/admin/dashboard"
          element={admin ? <AdminDashboard admin={admin} setAdmin={setAdmin} /> : <Navigate to="/admin/login" />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Show Footer only for public pages */}
      {!window.location.pathname.startsWith("/admin") && <Footer />}
    </Router>
  );
}

export default App;
