import { Link } from "react-router-dom";
const WHATSAPP = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`;// replace with your number
const INSTAGRAM = "https://www.instagram.com/vojalengineering?igsh=dXQ2MmkxdWQ1MGN2"; // replace with your handle
const FACEBOOK = "https://www.facebook.com/share/1BrDVyDeyk/"; // replace with your page
export default function Footer() {
  return (
    <footer style={{ fontFamily: "'DM Sans', sans-serif", background: "#3a0f45", color: "#fff", padding: "3rem 3rem 1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem", maxWidth: "1200px", margin: "0 auto 2.5rem" }}>

        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#C9A84C", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>VOJAL</div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "240px" }}>
            Premium water taps and plumbing accessories trusted by professionals and homeowners worldwide.
          </p>
        </div>

   <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "1rem" }}>Quick Links</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {["/", "/about", "/products", "/gallery", "/contact"].map((path, i) => (
              <li key={path}>
                <Link to={path} style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                  {["Home", "About Us", "Products", "Gallery", "Contact"][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "1rem" }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { icon: "📍", text: "Industrial Estate Gokul Road, Hubballi, Karnataka" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "✉️", text: "info@vojal.com" },
              { icon: "🕐", text: "Mon – Sat: 9:30 AM – 6:30 PM" },
          ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "14px" }}>{row.icon}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{row.text}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", textDecoration: "none" }}>💬</a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
                style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", textDecoration: "none" }}>📸</a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer"
                style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", textDecoration: "none" }}>👥</a>
            </div>
          </div>
        </div>
      </div>
<div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>© {new Date().getFullYear()} Vojal Engineering. All rights reserved.</span>
 <div style={{ width: "40px", height: "2px", background: "#C9A84C", borderRadius: "2px" }} />
</div>
    </footer>
  );
}