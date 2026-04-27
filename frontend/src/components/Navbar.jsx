import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#f0eadb] shadow-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .nav-link { position: relative; font-size: 13.5px; letter-spacing: 0.04em; color: #444; text-decoration: none; transition: color 0.25s; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #C9A84C; border-radius: 2px; transition: width 0.3s; }
        .nav-link:hover { color: #7B1F8A; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #7B1F8A; }
        .nav-link.active::after { width: 100%; }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        <img src={logo} alt="Vojal" className="h-11 w-auto object-contain" />

        <ul className="flex gap-9 list-none m-0 p-0">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About Us" },
            { path: "/products", label: "Products" },
             { path: "/catalogue", label: "Catalogue" },
            { path: "/gallery", label: "Gallery" },
           
            { path: "/contact", label: "Contact" },
          ].map((item) => (
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

        <NavLink
          to="/contact"
          className="bg-[#7B1F8A] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#5c1a6e] transition-colors"
        >
          Get in Touch
        </NavLink>
      </div>
    </nav>
  );
}