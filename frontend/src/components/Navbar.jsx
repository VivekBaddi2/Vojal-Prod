import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/catalogue", label: "Catalogue" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 border-b border-[#eee4c9] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #444;
          text-decoration: none;
          padding: 6px 0;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #7B1F8A);
          border-radius: 10px;
          transition: all 0.3s ease;
          transform: translateX(-50%);
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

        .cta-btn {
          background: linear-gradient(135deg, #7B1F8A, #5c1a6e);
          box-shadow: 0 8px 20px rgba(123, 31, 138, 0.22);
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(123, 31, 138, 0.30);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 lg:h-16 w-auto object-contain scale-110"
          />
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-10 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path}>
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
        <div className="hidden lg:flex items-center">
          <NavLink
            to="/contact"
            className="cta-btn text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            Get in Touch
          </NavLink>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden p-2 focus:outline-none"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#eee4c9] p-8 flex flex-col items-center gap-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="nav-link text-base"
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="cta-btn text-white px-8 py-3 rounded-xl mt-2"
          >
            Get in Touch
          </NavLink>
        </div>
      )}
    </nav>
  );
}