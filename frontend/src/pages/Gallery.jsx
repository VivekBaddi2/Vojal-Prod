import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = import.meta.env.VITE_API_URL;

// ─── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(14,3,22,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-hidden"
        style={{ maxWidth: "780px", borderRadius: "20px" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-400 hover:text-red-500 transition-colors shadow-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={`${item.image}`}
          alt={item.title}
          className="w-full object-cover"
          style={{ maxHeight: "70vh", display: "block" }}
        />

        {/* Caption */}
        <div
          className="px-6 py-5"
          style={{ background: "linear-gradient(135deg, #1a0628, #2a0a35)" }}
        >
          <h3
            className="text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.35rem",
              fontWeight: 700,
            }}
          >
            {item.title}
          </h3>
          {item.description && (
            <p className="text-white/60 text-sm mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <div className="h-[2px] w-8 rounded" style={{ background: "#C9A84C" }} />
            <div className="h-[2px] w-2 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({ g, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(g)}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        border: "1px solid #f0eadb",
        boxShadow: "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: "230px" }}>
        <img
          src={`${g.image}`}
          alt={g.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(42,10,53,0.5)", backdropFilter: "blur(2px)" }}
        >
          {/* Zoom icon */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/70"
            style={{ background: "rgba(123,31,138,0.75)" }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </div>
        </div>

        {/* Gold slide-in bottom border */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "linear-gradient(90deg, #C9A84C, #e8c96a)" }}
        />
      </div>

      {/* Caption */}
      <div className="p-5 text-center flex-1 flex flex-col justify-center">
        <h3
          className="text-[#3a0f45] font-semibold truncate"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", lineHeight: 1.3 }}
        >
          {g.title}
        </h3>
        {g.description && (
          <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
            {g.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-6" style={{ background: "#C9A84C", opacity: 0.6 }} />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "#C9A84C" }}>
            View
          </span>
          <div className="h-px w-6" style={{ background: "#C9A84C", opacity: 0.6 }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/gallery`)
      .then(({ data }) => setGallery(data))
      .catch(() => setError("Failed to load gallery"))
      .finally(() => setLoading(false));
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        html { scroll-behavior: smooth; }

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>

      <Navbar />

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section
          className="hero-grain relative overflow-hidden flex items-center justify-center text-white"
          style={{
            minHeight: "58vh",
            background: "linear-gradient(140deg, #1a0628 0%, #3a0f45 45%, #2a0a35 70%, #1d0830 100%)",
            paddingTop: "64px",
          }}
        >
          {/* Glow orbs */}
          <div className="absolute pointer-events-none" style={{ width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,31,138,0.25) 0%, transparent 70%)", top: "-120px", right: "-100px" }} />
          <div className="absolute pointer-events-none" style={{ width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", bottom: "-80px", left: "-60px" }} />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center px-6 py-16 space-y-5 max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10" style={{ background: "#C9A84C" }} />
              <p className="text-xl sm:text-3xl tracking-[0.25em] uppercase font-semibold" style={{ color: "#C9A84C" }}>
                Vojal Engineering
              </p>
              <div className="h-px w-10" style={{ background: "#C9A84C" }} />
            </div>

            {/* Heading */}
            <h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Our Gallery
            </h1>

            {/* Sub */}
            <p className="text-white/60 text-sm tracking-wide max-w-md mx-auto">
              Explore our work, installations &amp; client collaborations
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full transition-all"
                style={{
                  background: "linear-gradient(135deg, #7B1F8A, #9b30ae)",
                  color: "white",
                  border: "1px solid rgba(201,168,76,0.35)",
                  boxShadow: "0 4px 20px rgba(123,31,138,0.45)",
                }}
              >
                Get in Touch
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <div
          style={{
            background: "linear-gradient(90deg, #2a0a35, #3a0f45)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-8 flex-wrap">
            {[
              { label: "Gallery Items", value: loading ? "—" : `${gallery.length}+` },
             
              { label: "Years of Trust", value: "7+" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A84C" }}
                >
                  {s.value}
                </span>
                <span className="text-white/50 text-xs tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── GALLERY GRID ── */}
        <section
          className="py-12 md:py-20 px-6"
          style={{ background: "linear-gradient(180deg, #faf7fc 0%, #f8f4ff 100%)" }}
        >
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <h2
                  className="text-[#3a0f45]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  Photo Gallery
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[2px] w-10 rounded" style={{ background: "#C9A84C" }} />
                  <div className="h-[2px] w-3 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
                </div>
              </div>
              {!loading && !error && gallery.length > 0 && (
                <span
                  className="text-xs font-medium px-4 py-2 rounded-full"
                  style={{ background: "#ede0f7", color: "#7B1F8A" }}
                >
                  {gallery.length} image{gallery.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #f0eadb", background: "white" }}
                  >
                    <div
                      className="w-full animate-pulse"
                      style={{ height: "230px", background: "linear-gradient(90deg, #f5f0fb, #ede0f7, #f5f0fb)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}
                    />
                    <div className="p-5 space-y-2">
                      <div className="h-4 rounded-full animate-pulse mx-auto w-2/3" style={{ background: "#ede0f7" }} />
                      <div className="h-3 rounded-full animate-pulse mx-auto w-1/2" style={{ background: "#f5f0fb" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div
                className="text-center py-20 rounded-2xl"
                style={{ border: "2px dashed #ede0f7", background: "white" }}
              >
                <p className="text-3xl mb-3">⚠️</p>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && gallery.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 rounded-2xl"
                style={{ border: "2px dashed #ede0f7", background: "white" }}
              >
                <p className="text-4xl mb-4">🖼️</p>
                <p className="text-gray-400 text-sm font-medium">Gallery images will be updated soon.</p>
              </motion.div>
            )}

            {/* Grid */}
            {!loading && !error && gallery.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((g, i) => (
                  <GalleryCard
                    key={g._id}
                    g={g}
                    index={i}
                    onClick={setSelected}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── LIGHTBOX ── */}
      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <Footer />
    </>
  );
}