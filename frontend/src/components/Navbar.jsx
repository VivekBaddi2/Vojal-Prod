import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/catalogue", label: "Catalogue" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #4b5563;
          text-decoration: none;
          padding: 8px 0;
          transition: all 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          width: 0;
          height: 2px;
          border-radius: 10px;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #C9A84C, #7B1F8A);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #7B1F8A; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #7B1F8A; font-weight: 600; }
        .mobile-link {
          width: 100%;
          text-align: center;
          padding: 14px 18px;
          border-radius: 14px;
          transition: all 0.25s ease;
          font-size: 15px;
          font-weight: 500;
          color: #4b5563;
        }
        .mobile-link:hover, .mobile-link.active { background: #f8f1fc; color: #7B1F8A; }
        .cta-btn {
          background: linear-gradient(135deg, #7B1F8A, #9b30ae);
          box-shadow: 0 8px 24px rgba(123,31,138,0.22);
          transition: all 0.3s ease;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(123,31,138,0.30); }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          fontFamily: "'DM Sans', sans-serif",
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid rgba(238,228,201,0.6)",
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.06)" : "0 4px 20px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="Vojal Engineering"
              style={{ height: "42px", width: "auto", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "#3a0f45",
                  lineHeight: 1,
                  fontSize: "1.2rem",
                  whiteSpace: "nowrap",
                }}
              >
                VOJAL
              </div>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 600,
                  marginTop: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                Engineering
              </div>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <ul style={{ display: "none" }} className="lg-flex-nav">
            {navItems.map((item) => (
              <li key={item.path} style={{ listStyle: "none" }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div style={{ display: "none" }} className="lg-flex-cta">
            <NavLink
              to="/contact"
              className="cta-btn"
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              Get in Touch
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            className="lg-hidden-btn"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{
                display: "block", width: "24px", height: "2px", background: "#3a0f45",
                borderRadius: "2px", transition: "all 0.3s",
                transform: isOpen ? "rotate(45deg) translateY(8px)" : "none",
              }} />
              <span style={{
                display: "block", width: "24px", height: "2px", background: "#3a0f45",
                borderRadius: "2px", transition: "all 0.3s",
                opacity: isOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: "24px", height: "2px", background: "#3a0f45",
                borderRadius: "2px", transition: "all 0.3s",
                transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none",
              }} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                top: "5rem",
                left: 0,
                width: "100%",
                padding: "0 1.5rem 1.5rem",
              }}
              className="lg-hidden-menu"
            >
              <div
                style={{
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(201,168,76,0.14)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `mobile-link${isActive ? " active" : ""}`}
                      style={{ textDecoration: "none" }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="cta-btn"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "12px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  Get in Touch
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (min-width: 1024px) {
          .lg-flex-nav { display: flex !important; align-items: center; gap: 40px; padding: 0; margin: 0; }
          .lg-flex-cta { display: flex !important; align-items: center; }
          .lg-hidden-btn { display: none !important; }
          .lg-hidden-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}