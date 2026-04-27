import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
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

      <div className="max-w-7xl mx-auto px-8 lg:px-12 h-20 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Vojal"
            className="h-14 lg:h-16 w-auto object-contain scale-110 hover:scale-115 transition-transform duration-300"
          />
        </NavLink>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-10 list-none m-0 p-0">
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

        {/* CTA */}
        <NavLink
          to="/contact"
          className="cta-btn text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300"
        >
          Get in Touch
        </NavLink>
      </div>
    </nav>
  );
}