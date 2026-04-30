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
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

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

        .nav-link:hover {
          color: #7B1F8A;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #7B1F8A;
          font-weight: 600;
        }

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

        .mobile-link:hover,
        .mobile-link.active {
          background: #f8f1fc;
          color: #7B1F8A;
        }

        .cta-btn {
          background: linear-gradient(135deg, #7B1F8A, #9b30ae);
          box-shadow: 0 8px 24px rgba(123,31,138,0.22);
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(123,31,138,0.30);
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.15)"
            : "1px solid rgba(238,228,201,0.6)",
          boxShadow: scrolled
            ? "0 8px 30px rgba(0,0,0,0.06)"
            : "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Vojal Engineering"
              className="h-12 lg:h-14 w-auto object-contain"
            />

            <div className="hidden md:block mt-2">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.45rem",
                  fontWeight: 700,
                  color: "#3a0f45",
                  lineHeight: 1,
                }}
              >
                VOJAL
              </h2>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#C9A84C] font-semibold mt-0.5">
                Engineering
              </p>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <NavLink
              to="/contact"
              className="cta-btn text-white text-sm font-semibold px-6 py-3 rounded-full"
            >
              Get in Touch
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 focus:outline-none relative z-50"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-[#3a0f45] rounded transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#3a0f45] rounded transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#3a0f45] rounded transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
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
              className="lg:hidden absolute top-20 left-0 w-full px-6 pb-6"
            >
              <div
                className="rounded-3xl p-6 shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(201,168,76,0.14)",
                }}
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `mobile-link${isActive ? " active" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>

                <NavLink
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="cta-btn mt-5 w-full text-white text-sm font-semibold py-3 rounded-full flex items-center justify-center"
                >
                  Get in Touch
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}