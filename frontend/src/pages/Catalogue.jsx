import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = import.meta.env.VITE_API_URL;

function CatalogueCard({ c, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid #f0eadb",
        boxShadow:
          "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
      }}
    >
      {/* Top PDF Banner */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: "180px",
          background:
            "linear-gradient(135deg, #1a0628 0%, #3a0f45 50%, #2a0a35 100%)",
        }}
      >
        <div className="text-6xl">📄</div>

        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{
            background: "linear-gradient(90deg, #C9A84C, #e8c96a)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[#3a0f45] font-semibold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.25rem",
            lineHeight: 1.3,
          }}
        >
          {c.title}
        </h3>

        {c.description && (
          <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
            {c.description}
          </p>
        )}

        <div className="mt-3">
          <span
            className="text-[10px] px-3 py-1 rounded-full font-medium tracking-wide uppercase"
            style={{
              background: "#ede0f7",
              color: "#7B1F8A",
            }}
          >
            {c.category || "General"}
          </span>
        </div>

        <a
          href={`${c.file}`}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #7B1F8A, #9b30ae)",
            boxShadow: "0 4px 16px rgba(123,31,138,0.35)",
          }}
        >
          <span>⬇</span>
          Download Catalogue
        </a>
      </div>
    </motion.div>
  );
}

export default function Catalogue() {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/catalogue`)
      .then((r) => r.json())
      .then((data) => {
        setCatalogues(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <Navbar />

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* HERO */}
        <section
          className="hero-grain relative overflow-hidden flex items-center justify-center text-white"
          style={{
            minHeight: "58vh",
            background:
              "linear-gradient(140deg, #1a0628 0%, #3a0f45 45%, #2a0a35 70%, #1d0830 100%)",
            paddingTop: "64px",
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: 560,
              height: 560,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(123,31,138,0.25) 0%, transparent 70%)",
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
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              bottom: "-80px",
              left: "-60px",
            }}
          />

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
            transition={{ duration: 0.9 }}
            className="relative text-center px-6 py-16 space-y-5 max-w-2xl"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#C9A84C]">
                Vojal Engineering
              </p>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>

            <h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 700,
              }}
            >
              Product Catalogues
            </h1>

            <p className="text-white/60 text-sm tracking-wide max-w-md mx-auto">
              Download our premium product catalogues with complete
              specifications and technical details.
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full"
                style={{
                  background: "linear-gradient(135deg, #7B1F8A, #9b30ae)",
                  color: "white",
                  border: "1px solid rgba(201,168,76,0.35)",
                  boxShadow: "0 4px 20px rgba(123,31,138,0.45)",
                }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <div
          style={{
            background: "linear-gradient(90deg, #2a0a35, #3a0f45)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-8 flex-wrap">
            {[
              {
                label: "Catalogues",
                value: loading ? "—" : `${catalogues.length}+`,
              },
              { label: "Product Categories", value: "25+" },
              { label: "Technical Specs", value: "100%" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className="text-xl font-bold text-[#C9A84C]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.value}
                </span>
                <span className="text-white/50 text-xs tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CATALOGUE GRID */}
        <section
          className="py-12 md:py-20 px-6"
          style={{
            background: "linear-gradient(180deg, #faf7fc 0%, #f8f4ff 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2
                className="text-[#3a0f45]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                }}
              >
                Available Catalogues
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[2px] w-10 bg-[#C9A84C]" />
                <div className="h-[2px] w-3 bg-[#C9A84C]/40" />
              </div>
            </div>

            {loading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-white"
                    style={{ border: "1px solid #f0eadb" }}
                  >
                    <div
                      className="animate-pulse"
                      style={{
                        height: "180px",
                        background:
                          "linear-gradient(90deg,#f5f0fb,#ede0f7,#f5f0fb)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-[#ede0f7] rounded-full w-2/3" />
                      <div className="h-3 bg-[#f5f0fb] rounded-full w-full" />
                      <div className="h-10 bg-[#ede0f7] rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && catalogues.length === 0 && (
              <div
                className="text-center py-24 rounded-2xl"
                style={{
                  border: "2px dashed #ede0f7",
                  background: "white",
                }}
              >
                <p className="text-4xl mb-4">📄</p>
                <p className="text-gray-400 text-sm font-medium">
                  No catalogues available yet.
                </p>
              </div>
            )}

            {!loading && catalogues.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalogues.map((c, i) => (
                  <CatalogueCard key={c._id} c={c} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}