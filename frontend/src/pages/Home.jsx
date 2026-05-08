import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const API_BASE = import.meta.env.VITE_API_URL;

// ─── WhatsApp SVG ────────────────────────────────────────────────────────────
const WAIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── Product Modal ───────────────────────────────────────────────────────────
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
        style={{ background: "rgba(14,3,22,0.82)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.93, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 28 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white w-full flex flex-col"
          style={{ maxWidth: "500px", maxHeight: "90vh", borderRadius: "24px", boxShadow: "0 40px 100px rgba(42,10,53,0.5)" }}
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

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            <div className="relative" style={{ height: "260px", flexShrink: 0 }}>
              <img src={`${product.image}`} alt={product.title} className="w-full h-full object-cover" style={{ borderRadius: "24px 24px 0 0" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,10,53,0.75) 0%, transparent 55%)", borderRadius: "24px 24px 0 0" }} />
              <div className="absolute bottom-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(201,168,76,0.92)", color: "#2a0a35" }}>
                {product.category}
              </div>
            </div>
            <div className="px-6 pt-5 pb-2">
              <h2 className="text-[#3a0f45] leading-tight mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.65rem", fontWeight: 700 }}>
                {product.title}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 rounded" style={{ background: "#C9A84C" }} />
                <div className="h-[2px] w-2 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>
              <div className="flex items-center justify-between rounded-xl px-4 py-3 mb-2" style={{ background: "#faf7fc", border: "1px solid #ede0f7" }}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Category</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "white", color: "#7B1F8A", border: "1px solid #e0c8f0" }}>{product.category}</span>
                </div>
                {product.mrp > 0 && <span className="text-base font-bold" style={{ color: "#7B1F8A" }}>₹{product.mrp}</span>}
              </div>
            </div>
            <div style={{ height: "140px" }} />
          </div>

          {/* Sticky action bar */}
          <div className="shrink-0 px-6 pb-6 pt-4" style={{ background: "white", borderTop: "1px solid #f0eadb", boxShadow: "0 -8px 24px rgba(255,255,255,0.9)", borderRadius: "0 0 24px 24px" }}>
            <p className="text-[11px] text-gray-400 text-center mb-3 tracking-wide">Contact us on WhatsApp for pricing &amp; bulk orders</p>
            <button
              onClick={() => onWhatsApp(product)}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-60"
              style={{ background: isLoading ? "#82c99a" : "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}
            >
              <WAIcon />
              {isLoading ? "Verifying…" : "Enquire on WhatsApp"}
            </button>
            <button onClick={onClose} className="w-full mt-2.5 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors" style={{ border: "1px solid #eee" }}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Feature Card ────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-7 flex flex-col gap-4 group"
      style={{
        background: "white",
        border: "1px solid #f0eadb",
        boxShadow: "0 2px 16px rgba(58,15,69,0.06)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(123,31,138,0.12)", borderColor: "#e0c8f0" }}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl text-xl shrink-0"
        style={{ background: "linear-gradient(135deg, #f3e8fa, #ede0f7)", color: "#7B1F8A" }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#3a0f45] mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Stat Counter ────────────────────────────────────────────────────────────
function StatItem({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <p className="font-bold leading-none mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3rem)", color: "#C9A84C" }}>{value}</p>
      <p className="text-white/50 text-[10px] tracking-widest uppercase">{label}</p>
    </motion.div>
  );
}

// ─── Infinite Marquee — seamless, no visible duplicates ──────────────────────
// The trick: we render items once in the DOM, CSS animation handles the loop
// by duplicating via CSS (using a wrapper that's 2× wide with the track repeated twice).
function InfiniteMarquee({ items, direction = "left", speed = 40, renderItem }) {
  // We need at least enough items to fill the viewport; duplicate array for seamless loop
  const repeated = [...items, ...items];
  const animClass = direction === "left" ? "marquee-ltr" : "marquee-rtl";
  return (
    <div style={{ overflow: "hidden" }}>
      <div className={`marquee-track-inner ${animClass}`} style={{ display: "flex", gap: "1.25rem", width: "max-content" }}>
        {repeated.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetch(`${API_BASE}/api/product`).then(r => r.json()).then(d => setProducts(d.slice(0, 10)));
    fetch(`${API_BASE}/api/gallery`).then(r => r.json()).then(d => setGallery(d.slice(0, 10)));
  }, []);

  const handleWhatsApp = async (product) => {
    try {
      if (!executeRecaptcha) return;
      setIsLoading(true);
      const token = await executeRecaptcha("enquire");
      const verify = await axios.post(`${API_BASE}/api/captcha/verify`, { token });
      if (!verify.data.success) { alert("Bot detected! Please try again."); setIsLoading(false); return; }
      const message = `Hello Vojal Engineering! 👋\n\nI'm interested in:\n*Product:* ${product.title}\n*Category:* ${product.category}\n*Description:* ${product.description}\n\n*Product Image:* ${product.image}\n\nPlease share more details. Thank you!`;
      const link = document.createElement("a");
      link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      link.target = "_blank"; link.rel = "noopener noreferrer";
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setSelectedProduct(null); setIsLoading(false);
    } catch { alert("Verification failed."); setIsLoading(false); }
  };

  const features = [
    { icon: "🏆", title: "Premium Quality", desc: "Every product manufactured to meet IS standards with rigorous quality checks before dispatch." },
    { icon: "🔧", title: "Expert Engineering", desc: "15+ years of engineering expertise in water fittings and plumbing hardware solutions." },
    { icon: "🚚", title: "Pan-India Delivery", desc: "Reliable logistics network ensuring timely delivery across all major cities and towns." },
    { icon: "🤝", title: "Dealership Network", desc: "Join our growing network of 200+ authorised dealers and distributors across India." },
    { icon: "💬", title: "Dedicated Support", desc: "Our team is always available to assist with product selection and after-sales queries." },
    { icon: "♻️", title: "Durable Materials", desc: "High-grade brass, stainless steel and CPVC used across our product range for longevity." },
  ];

  // Split gallery into two rows for the two-row marquee
  const galleryRow1 = gallery;
  const galleryRow2 = gallery.length > 0 ? [...gallery].reverse() : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; }

        /* ── Grain overlay ── */
        .vj-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }

        /* ── Marquee keyframes ── */
        @keyframes mq-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mq-rtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-ltr {
          animation: mq-ltr 40s linear infinite;
        }
        .marquee-rtl {
          animation: mq-rtl 44s linear infinite;
        }
        .marquee-ltr:hover,
        .marquee-rtl:hover {
          animation-play-state: paused;
        }

        /* ── Product card gold line ── */
        .prod-card .gold-line {
          width: 0;
          transition: width 0.5s ease;
        }
        .prod-card:hover .gold-line {
          width: 100%;
        }

        /* ── Hide scrollbar ── */
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { scrollbar-width: none; }
      `}</style>

      <Navbar />

      {/* ════════════════════════════════════════════════════════ HERO */}
      <section
        className="vj-grain relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ background: "linear-gradient(140deg, #120420 0%, #3a0f45 45%, #220835 70%, #160528 100%)" }}
      >
        {/* Glow orbs */}
        <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,31,138,0.25) 0%, transparent 65%)", top: "-260px", right: "-200px" }} />
        <div className="absolute pointer-events-none" style={{ width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 65%)", bottom: "-120px", left: "-120px" }} />
        <div className="absolute pointer-events-none" style={{ width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,31,138,0.13) 0%, transparent 65%)", bottom: "22%", right: "8%" }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative text-center px-6 max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Eyebrow */}
          <motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex items-center justify-center gap-2 md:gap-5"
>
  <div className="h-px w-20 sm:w-28" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
  <p className="text-md sm:text-xl tracking-[0.25em] uppercase font-semibold" style={{ color: "#C9A84C" }}>
    Vojal Engineering
  </p>
  <div className="h-px w-20 sm:w-28" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
</motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.05] text-4xl md:text-7xl lg:text-[80px]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Crafted for{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Excellence,</em>
            <br />
            Built to Last
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-white/55 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
          >
            Premium water taps, shower heads &amp; plumbing accessories trusted by professionals across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #7B1F8A, #9b30ae)", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 4px 28px rgba(123,31,138,0.55)" }}
              >
                Explore Products
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(201,168,76,0.45)", backdropFilter: "blur(6px)" }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col items-center gap-2 pt-8"
          >
            <span className="text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: "1.5px solid rgba(255,255,255,0.18)" }}
            >
              <div className="w-1 h-2 rounded-full" style={{ background: "#C9A84C" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ STATS BAND */}
      <div style={{ background: "linear-gradient(90deg, #200630, #3a0f45, #200630)", borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
        <div className="max-w-5xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
          {[
            { value: "7+", label: "Years Experience" },
            { value: "50+", label: "Dealer Network" },
            { value: "30+", label: "Product Range" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((s, i) => <StatItem key={s.label} {...s} delay={i * 0.1} />)}
        </div>
      </div>

      {/* ════════════════════════════════════════════ PRODUCTS MARQUEE */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #faf7fc 0%, #f5f0ff 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
                style={{ color: "#C9A84C" }}
              >
                Our Range
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="text-[#3a0f45]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 700 }}
              >
                Featured Products
              </motion.h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[2px] w-10 rounded" style={{ background: "#C9A84C" }} />
                <div className="h-[2px] w-3 rounded" style={{ background: "#C9A84C", opacity: 0.35 }} />
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                style={{ color: "#7B1F8A", background: "rgba(123,31,138,0.08)", border: "1px solid rgba(123,31,138,0.15)" }}
              >
                View All
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Marquee — items duplicated for seamless loop only */}
        {products.length > 0 && (
          <InfiniteMarquee
            items={products}
            direction="left"
            renderItem={(p, i) => (
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProduct(p)}
                className="prod-card w-[230px] bg-white rounded-2xl overflow-hidden cursor-pointer group"
                style={{ border: "1px solid #f0eadb", boxShadow: "0 2px 16px rgba(58,15,69,0.07)", transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 32px rgba(123,31,138,0.18)"; e.currentTarget.style.borderColor = "#C9A84C"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(58,15,69,0.07)"; e.currentTarget.style.borderColor = "#f0eadb"; }}
              >
                <div className="relative overflow-hidden" style={{ height: "175px" }}>
                  <img src={`${p.image}`} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(42,10,53,0.42)" }}>
                    <span className="text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full" style={{ background: "rgba(123,31,138,0.78)", border: "1px solid rgba(255,255,255,0.3)" }}>View Details</span>
                  </div>
                  {/* Gold bottom line on hover */}
                  <div className="gold-line absolute bottom-0 left-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C9A84C, #e8c96a)" }} />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: "#f3e8fa", color: "#7B1F8A" }}>{p.category}</span>
                  <h3 className="font-semibold text-[#3a0f45] mt-2 truncate" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>{p.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="mt-3 flex items-center justify-end gap-1 text-xs font-semibold" style={{ color: "#C9A84C" }}>
                    Enquire
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </div>
                </div>
              </motion.div>
            )}
          />
        )}
      </section>

      {/* ════════════════════════════════════════ WHY CHOOSE US */}
      <section className="py-16 md:py-24 px-6" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
                <p className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: "#C9A84C" }}>Why Vojal</p>
                <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
              </div>
              <h2 className="text-[#3a0f45]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700 }}>
                The Vojal Advantage
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Trusted by contractors, architects and homeowners for premium quality at competitive prices.
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ GALLERY MARQUEE */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #faf7fc 0%, #f5f0ff 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
                style={{ color: "#C9A84C" }}
              >
                Showcase
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="text-[#3a0f45]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 700 }}
              >
                Gallery
              </motion.h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[2px] w-10 rounded" style={{ background: "#C9A84C" }} />
                <div className="h-[2px] w-3 rounded" style={{ background: "#C9A84C", opacity: 0.35 }} />
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full"
                style={{ color: "#7B1F8A", background: "rgba(123,31,138,0.08)", border: "1px solid rgba(123,31,138,0.15)" }}
              >
                View All
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Row 1 — left to right */}
        {galleryRow1.length > 0 && (
          <div className="mb-4">
            <InfiniteMarquee
              items={galleryRow1}
              direction="left"
              renderItem={(g, i) => (
                <div
                  className="w-[265px] rounded-2xl overflow-hidden group"
                  style={{ border: "1px solid #f0eadb", boxShadow: "0 2px 14px rgba(58,15,69,0.07)" }}
                >
                  <div className="relative overflow-hidden" style={{ height: "195px" }}>
                    <img
                      src={`${g.image}`}
                      alt={g.title || "Gallery"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(42,10,53,0.28)" }} />
                  </div>
                </div>
              )}
            />
          </div>
        )}

        {/* Row 2 — right to left */}
        {galleryRow2.length > 0 && (
          <InfiniteMarquee
            items={galleryRow2}
            direction="right"
            renderItem={(g, i) => (
              <div
                className="w-[220px] rounded-2xl overflow-hidden group"
                style={{ border: "1px solid #f0eadb", boxShadow: "0 2px 14px rgba(58,15,69,0.07)" }}
              >
                <div className="relative overflow-hidden" style={{ height: "160px" }}>
                  <img
                    src={`${g.image}`}
                    alt={g.title || "Gallery"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(42,10,53,0.28)" }} />
                </div>
              </div>
            )}
          />
        )}
      </section>

      {/* ════════════════════════════════════════════════════ CTA BAND */}
      <section
        className="vj-grain relative overflow-hidden py-20 px-6"
        style={{ background: "linear-gradient(135deg, #120420 0%, #3a0f45 50%, #1e0830 100%)" }}
      >
        <div className="absolute pointer-events-none" style={{ width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,31,138,0.22) 0%, transparent 65%)", top: "-160px", right: "-110px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: "#C9A84C" }}>Partner With Us</p>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Ready to Elevate Your<br />
            <em style={{ color: "#C9A84C" }}>Plumbing Solutions?</em>
          </motion.h2>

          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Explore our full product range or get in touch to discuss dealership, bulk orders, or custom requirements.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex gap-4 justify-center flex-wrap pt-2"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #7B1F8A, #9b30ae)", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 4px 28px rgba(123,31,138,0.5)" }}
              >
                Browse Products
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(201,168,76,0.45)", backdropFilter: "blur(6px)" }}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ MODAL */}
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