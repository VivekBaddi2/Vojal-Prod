import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Flowtec
        </h1>

        {/* Links */}
        <ul className="flex gap-8 text-white font-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About Us" },
            { path: "/products", label: "Products" },
            { path: "/gallery", label: "Gallery" },
            { path: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative transition-all duration-300
                   after:content-[''] after:absolute after:-bottom-1 after:left-0
                   after:h-[2px] after:bg-white after:w-0 hover:after:w-full
                   ${isActive ? "after:w-full" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
