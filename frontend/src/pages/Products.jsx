import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useState,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = import.meta.env.VITE_API_URL;
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

// ─── WhatsApp SVG ──────────────────────────────────────────────────────────────
const WAIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
// ─── Zoom Image ────────────────────────────────────────────────────────────────
function ZoomImage({ src, alt }) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleClick = (e) => {
    if (dragging) return;
    if (scale !== 1) {
      setScale(1);
      setOrigin({ x: 50, y: 50 });
      setDragOffset({ x: 0, y: 0 });
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
    setScale(2.5);
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return;
    e.preventDefault();
    setDragging(false);
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleMouseMove = (e) => {
    if (scale === 1) return;
    if (e.buttons !== 1) return;
    setDragging(true);
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setTimeout(() => setDragging(false), 10);
  };

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        cursor: scale === 1 ? "zoom-in" : "zoom-out",
        position: "relative",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
      style={{
  width: "100%",
  height: "300px",
  objectFit: "contain",
  display: "block",
          transform: `scale(${scale}) translate(${dragOffset.x / scale}px, ${dragOffset.y / scale}px)`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: dragging ? "none" : "transform 0.4s ease",
          userSelect: "none",
        }}
      />
      {scale === 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(58,15,69,0.65)",
            color: "white",
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 20,
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          Click to zoom
        </div>
      )}
    </div>
  );
}
// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(p)}
className="group relative bg-white rounded-2xl cursor-pointer flex flex-col"
      style={{
        boxShadow: "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
        border: "1px solid #f0eadb",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Image */}

<div className="relative overflow-hidden rounded-t-2xl" style={{ height: "240px", background: "#faf7fc" }}>
  <img
    src={`${p.image}`}
    alt={p.title}
    className="w-full h-full object-contain p-2"
  />
        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(58,15,69,0.45)", backdropFilter: "blur(2px)" }}
        >
          <span
            className="text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full border border-white/60"
            style={{ background: "rgba(123,31,138,0.7)" }}
          >
            View Details
          </span>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{ background: "rgba(123,31,138,0.9)", backdropFilter: "blur(4px)" }}
        >
          {p.category}
        </div>

        {/* Gold accent line on hover */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "linear-gradient(90deg, #C9A84C, #e8c96a)" }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-semibold text-base mb-2 line-clamp-1 text-[#3a0f45]"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: "1.1rem", lineHeight: 1.3 }}
        >
          {p.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
          {p.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid #f5f0fb" }}>
          {p.mrp > 0 ? (
            <span className="text-sm font-bold" style={{ color: "#7B1F8A" }}>₹{p.mrp}</span>
          ) : (
            <span className="text-xs text-gray-300 italic">Price on enquiry</span>
          )}
          <span
            className="text-xs font-semibold tracking-wide flex items-center gap-1"
            style={{ color: "#C9A84C" }}
          >
            Enquire
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onWhatsApp, isLoading }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(20,4,30,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white w-full overflow-hidden flex flex-col"
          style={{
            maxWidth: "520px",
            maxHeight: "90vh",
            borderRadius: "24px",
            boxShadow: "0 32px 80px rgba(58,15,69,0.4)",
          }}
        >
          {/* ── Close button (always on top, never scrolls away) ── */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-400 hover:text-red-500 transition-colors shadow-md"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* ── Scrollable inner ── */}
          <div className="overflow-y-auto flex-1 overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>

            {/* Hero image */}
<div className="relative overflow-hidden" style={{ background: "#faf7fc", flexShrink: 0, height: "300px" }}>
  <ZoomImage src={product.image} alt={product.title} />
            
             {/* Gradient overlay */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{ background: "linear-gradient(to top, rgba(58,15,69,0.7) 0%, transparent 55%)" }}
/>
              {/* Category pill on image */}
<div
  className="absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full pointer-events-none"
                style={{ background: "rgba(201,168,76,0.92)", color: "#2a0a35" }}
              >
                {product.category}
              </div>
            </div>

            {/* Info section */}
            <div className="px-6 pt-5 pb-2">
              {/* Title */}
              <h2
                className="text-[#3a0f45] leading-tight mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                  fontSize: "1.65rem",
                  fontWeight: 700,
                }}
              >
                {product.title}
              </h2>

              {/* Gold divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 rounded" style={{ background: "#C9A84C" }} />
                <div className="h-[2px] w-2 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
              </div>

              {/* Description — full, scrollable */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Meta row */}
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3 mb-2"
                style={{ background: "#faf7fc", border: "1px solid #ede0f7" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Category</span>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "white", color: "#7B1F8A", border: "1px solid #e0c8f0" }}
                  >
                    {product.category}
                  </span>
                </div>
                {product.mrp > 0 && (
                  <span className="text-base font-bold" style={{ color: "#7B1F8A" }}>
                    ₹{product.mrp}
                  </span>
                )}
              </div>
            </div>

            {/* Spacer so content doesn't get hidden behind sticky footer */}
            <div style={{ height: "140px" }} />
          </div>

          {/* ── Sticky action bar — always visible at bottom ── */}
          <div
            className="shrink-0 px-6 pb-6 pt-4"
            style={{
              background: "white",
              borderTop: "1px solid #f0eadb",
              boxShadow: "0 -8px 24px rgba(255,255,255,0.9)",
            }}
          >
            <p className="text-[11px] text-gray-400 text-center mb-3 tracking-wide">
              Contact us on WhatsApp for pricing & bulk orders
            </p>

            <button
              onClick={() => onWhatsApp(product)}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60"
              style={{
                background: isLoading
                  ? "#82c99a"
                  : "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
                boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
              }}
            >
              <WAIcon />
              {isLoading ? "Verifying…" : "Enquire on WhatsApp"}
            </button>

            <button
              onClick={onClose}
              className="w-full mt-2.5 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
              style={{ border: "1px solid #eee" }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const fetchAll = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/product`);
      setCategories(["All", ...new Set(data.map((p) => p.category))]);
    } catch {}
  };

  const fetchProducts = async (category = "") => {
    try {
      const url =
        category && category !== "All"
          ? `${API_BASE}/api/product?category=${category}`
          : `${API_BASE}/api/product`;
      const { data } = await axios.get(url);
      setProducts(data);
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => { fetchProducts(selectedCategory); }, [selectedCategory]);

  const handleWhatsApp = async (product) => {
    try {
      if (!executeRecaptcha) return;
      setIsLoading(true);
      const token = await executeRecaptcha("enquire");
      if (!token) { setIsLoading(false); return; }

      const verify = await axios.post(`${API_BASE}/api/captcha/verify`, { token });
      if (!verify.data.success) {
        alert("Bot detected! Please try again.");
        setIsLoading(false);
        return;
      }
const imageUrl = `${product.image}`;
const message = `Hello Vojal Engineering!\n\nI'm interested in:\n\n*Product:* ${product.title}\n*Category:* ${product.category}\n*Description:* ${product.description}\n*MRP:* ${product.mrp > 0 ? `Rs.${product.mrp}` : "Price on enquiry"}\n\n*Product Image:* ${imageUrl}\n\nPlease share more details. Thank you!`;
const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSelectedProduct(null);
      setIsLoading(false);
    } catch (err) {
      console.error("Captcha error:", err);
      alert("Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        html { scroll-behavior: smooth; }

        /* Hero grain overlay */
        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Category filter scroll hide scrollbar */
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-bar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Modal scroll hide */
        .modal-scroll::-webkit-scrollbar { display: none; }
        .modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
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
          {/* Decorative circles */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(123,31,138,0.25) 0%, transparent 70%)",
              top: "-120px",
              right: "-100px",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              bottom: "-80px",
              left: "-60px",
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)",
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
            <p
  className="text-xl sm:text-3xl tracking-[0.25em] uppercase font-semibold"
  style={{ color: "#C9A84C" }}
>
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
              Our Products
            </h1>

            {/* Sub */}
            <p className="text-white/60 text-sm tracking-wide max-w-md mx-auto">
              Premium Water Taps &amp; Plumbing Accessories crafted for lasting quality
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
          className="relative z-10"
          style={{
            background: "linear-gradient(90deg, #2a0a35, #3a0f45)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-8 flex-wrap">
            {[
              { label: "Product Range", value: `${products.length}+` },
              { label: "Categories", value: `${Math.max(0, categories.length - 1)}` },
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

        {/* ── FILTER BAR ── */}
        <div
          className="sticky top-16 z-40 bg-white"
          style={{ borderBottom: "1px solid #f0eadb", boxShadow: "0 2px 12px rgba(58,15,69,0.06)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="filter-bar flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap text-xs font-semibold tracking-wide px-5 py-2 rounded-full transition-all duration-250 shrink-0"
                  style={
                    selectedCategory === cat
                      ? {
                          background: "linear-gradient(135deg, #7B1F8A, #5c1a6e)",
                          color: "white",
                          boxShadow: "0 2px 10px rgba(123,31,138,0.35)",
                          border: "2px solid #7B1F8A",
                        }
                      : {
                          background: "white",
                          color: "#7B1F8A",
                          border: "2px solid #ede0f7",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
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
                  {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[2px] w-10 rounded" style={{ background: "#C9A84C" }} />
                  <div className="h-[2px] w-3 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
                </div>
              </div>
              <span
                className="text-xs font-medium px-4 py-2 rounded-full"
                style={{ background: "#ede0f7", color: "#7B1F8A" }}
              >
                {products.length} product{products.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {/* Grid */}
            {products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 rounded-2xl"
                style={{ border: "2px dashed #ede0f7", background: "white" }}
              >
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-400 text-sm font-medium">No products found in this category.</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p, i) => (
                  <ProductCard
                    key={p._id}
                    p={p}
                    index={i}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onWhatsApp={handleWhatsApp}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}