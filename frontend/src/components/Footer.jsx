import { Link } from "react-router-dom";

const WHATSAPP = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`;
const INSTAGRAM =
  "https://www.instagram.com/vojalengineering?igsh=dXQ2MmkxdWQ1MGN2";
const FACEBOOK = "https://www.facebook.com/share/1BrDVyDeyk/";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Catalogue", path: "/catalogue" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <footer
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background:
            "linear-gradient(145deg, #16051f 0%, #2a0a35 45%, #3a0f45 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(123,31,138,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "4.5rem 1.5rem 1.5rem",
          }}
        >
          {/* Top Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "3rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Brand */}
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.06em",
                  marginBottom: "1rem",
                }}
              >
                VOJAL
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.9,
                  maxWidth: "300px",
                }}
              >
                Premium water taps and plumbing accessories crafted for
                durability, performance, and elegant modern living.
              </p>

              {/* Accent Bar */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginTop: "1.2rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "2px",
                    background: "#C9A84C",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "2px",
                    background: "rgba(201,168,76,0.4)",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 600,
                  marginBottom: "1.25rem",
                }}
              >
                Quick Links
              </h4>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#C9A84C";
                        e.target.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgba(255,255,255,0.65)";
                        e.target.style.paddingLeft = "0px";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 600,
                  marginBottom: "1.25rem",
                }}
              >
                Contact
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: "📍",
                    text: "Industrial Estate Gokul Road, Hubballi, Karnataka",
                  },
                  { icon: "📞", text: "+91 98765 43210" },
                  { icon: "✉️", text: "info@vojal.com" },
                  { icon: "🕐", text: "Mon – Sat: 9:00 AM – 6:00 PM" },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>{row.icon}</span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.7,
                      }}
                    >
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social / CTA */}
            <div>
              <h4
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 600,
                  marginBottom: "1.25rem",
                }}
              >
                Connect With Us
              </h4>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                Follow us on social media for latest updates, launches &
                product showcases.
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  {
                    href: WHATSAPP,
                    bg: "#25D366",
                    icon: "W",
                  },
                  {
                    href: INSTAGRAM,
                    bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                    icon: "I",
                  },
                  {
                    href: FACEBOOK,
                    bg: "#1877F2",
                    icon: "F",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: social.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-4px) scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              © {new Date().getFullYear()} Vojal Engineering. All rights reserved.
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "2px",
                  background: "#C9A84C",
                  borderRadius: "10px",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "2px",
                  background: "rgba(201,168,76,0.4)",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}