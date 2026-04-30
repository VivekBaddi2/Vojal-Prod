import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

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
              About Us
            </h1>

            <p className="text-white/60 text-sm tracking-wide max-w-md mx-auto">
              Trusted manufacturer from Hubli delivering reliable, affordable,
              and long-lasting water tap solutions.
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
              { label: "Years of Trust", value: "7+" },
              { label: "Dealer Network", value: "100+" },
              { label: "Products Delivered", value: "10K+" },
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

        {/* MAIN SECTION */}
        <section
          className="py-12 md:py-20 px-6"
          style={{
            background: "linear-gradient(180deg, #faf7fc 0%, #f8f4ff 100%)",
          }}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* TABS */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { key: "about", label: "About Us" },
                { key: "mission", label: "Mission" },
                { key: "vision", label: "Vision" },
                { key: "values", label: "Core Values" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background:
                      activeTab === tab.key
                        ? "linear-gradient(135deg, #7B1F8A, #9b30ae)"
                        : "#ffffff",
                    color: activeTab === tab.key ? "#fff" : "#6b7280",
                    border:
                      activeTab === tab.key
                        ? "1px solid rgba(201,168,76,0.35)"
                        : "1px solid #ede0f7",
                    boxShadow:
                      activeTab === tab.key
                        ? "0 8px 24px rgba(123,31,138,0.18)"
                        : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ABOUT */}
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid md:grid-cols-2 gap-10 items-start"
                >
                  <div
                    className="bg-white rounded-3xl p-8 md:p-10"
                    style={{
                      border: "1px solid #f0eadb",
                      boxShadow:
                        "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
                    }}
                  >
                    <h2
                      className="text-[#3a0f45]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2rem",
                        fontWeight: 700,
                      }}
                    >
                      Our Story
                    </h2>

                    <div className="flex items-center gap-2 mt-2 mb-6">
                      <div className="h-[2px] w-10 bg-[#C9A84C]" />
                      <div className="h-[2px] w-3 bg-[#C9A84C]/40" />
                    </div>

                    <div className="space-y-5 text-gray-600 leading-7 text-[15px]">
                      <p>
                        Vojal Engineering is a trusted manufacturer of
                        high-quality plastic and PTMT water taps, proudly based
                        in Hubli, Karnataka. With a strong commitment to
                        innovation, durability, and customer satisfaction, we
                        deliver reliable water solutions designed for modern
                        homes and commercial spaces.
                      </p>

                      <p>
                        Founded with a vision to make premium-quality taps
                        accessible and affordable, we combine advanced
                        manufacturing techniques with strict quality control to
                        ensure every product meets industry standards. Our taps
                        are built for durability, corrosion resistance, and
                        long-lasting performance in diverse water conditions.
                      </p>

                      <p>
                        We focus on continuous improvement and customer-centric
                        growth by offering products that balance functionality
                        with modern design. Our wide product range serves
                        dealers, distributors, and customers across Karnataka
                        and beyond.
                      </p>

                      <p>
                        Our mission is simple — to become a preferred brand in
                        the water tap industry by delivering value, reliability,
                        and trust in every drop.
                      </p>

                      <div className="bg-[#faf7fc] border-l-4 border-[#7B1F8A] p-4 rounded-xl">
                        <p className="text-[#3a0f45] font-medium text-sm">
                          Delivering value, reliability, and trust in every
                          drop.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-white rounded-3xl p-8 md:p-10"
                    style={{
                      border: "1px solid #f0eadb",
                      boxShadow:
                        "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
                    }}
                  >
                    <h3
                      className="text-[#7B1F8A] mb-6"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.7rem",
                        fontWeight: 700,
                      }}
                    >
                      At a Glance
                    </h3>

                    <div className="space-y-4">
                      {[
                        "Hubli, Karnataka based manufacturer",
                        "Plastic & PTMT water tap specialists",
                        "Stringent quality control on every product",
                        "Serving dealers, distributors across Karnataka & beyond",
                      ].map((v, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#7B1F8A] text-white text-xs flex items-center justify-center mt-0.5">
                            ✓
                          </div>
                          <span className="text-sm text-[#3a0f45] leading-relaxed">
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MISSION */}
              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white rounded-3xl p-10 text-center border border-[#f0eadb] shadow-sm">
                    <div className="text-5xl mb-5">🎯</div>
                    <h2
                      className="text-[#3a0f45] mb-3"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.2rem",
                        fontWeight: 700,
                      }}
                    >
                      Our Mission
                    </h2>
                    <p className="text-gray-600 leading-8">
                      To deliver{" "}
                      <span className="text-[#7B1F8A] font-semibold">
                        precision-engineered water tap solutions
                      </span>{" "}
                      that combine durability, functionality, and design
                      excellence, ensuring maximum value for customers and
                      business growth for our partners.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* VISION */}
              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white rounded-3xl p-10 text-center border border-[#f0eadb] shadow-sm">
                    <div className="text-5xl mb-5">🔭</div>
                    <h2
                      className="text-[#3a0f45] mb-3"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.2rem",
                        fontWeight: 700,
                      }}
                    >
                      Our Vision
                    </h2>
                    <p className="text-gray-600 leading-8">
                      To establish Vojal Engineering as a{" "}
                      <span className="text-[#7B1F8A] font-semibold">
                        benchmark brand
                      </span>{" "}
                      in the PTMT and plastic tap industry, recognized for
                      innovation, quality leadership, and nationwide presence.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* VALUES */}
              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: "🏆",
                        title: "Quality First",
                        desc: "Every tap we manufacture undergoes strict quality checks to ensure long-lasting reliability and durability.",
                      },
                      {
                        icon: "🤝",
                        title: "Customer Commitment",
                        desc: "Our customers and partners are at the heart of everything we do. We strive to add real value to their business.",
                      },
                      {
                        icon: "🔒",
                        title: "Integrity & Trust",
                        desc: "We believe in transparent and ethical business practices, building long-term relationships driven by honesty.",
                      },
                      {
                        icon: "💡",
                        title: "Innovation & Improvement",
                        desc: "We continuously upgrade our designs, materials, and processes to stay ahead and deliver better products.",
                      },
                      {
                        icon: "💰",
                        title: "Value for Money",
                        desc: "We offer the right balance of quality and affordability, keeping products competitive and profitable for partners.",
                      },
                      {
                        icon: "⚙️",
                        title: "Reliability & Consistency",
                        desc: "Our partners can depend on us for stable performance, consistent quality, and dependable supply.",
                      },
                      {
                        icon: "📈",
                        title: "Growth Through Partnership",
                        desc: "We believe in growing together by supporting our dealers and distributors to create mutual success.",
                      },
                    ].map((val, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl p-6"
                        style={{
                          border: "1px solid #f0eadb",
                          boxShadow:
                            "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
                        }}
                      >
                        <div className="text-3xl mb-4">{val.icon}</div>
                        <h4
                          className="text-[#7B1F8A] mb-2"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.35rem",
                            fontWeight: 700,
                          }}
                        >
                          {val.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-7">
                          {val.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* WHY CHOOSE */}
        <section className="bg-white border-t border-[#f0eadb] py-12 md:py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2
              className="text-[#3a0f45]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.4rem",
                fontWeight: 700,
              }}
            >
              Why Choose Vojal?
            </h2>

            <div className="flex justify-center gap-2 mt-2 mb-4">
              <div className="h-[2px] w-10 bg-[#C9A84C]" />
              <div className="h-[2px] w-3 bg-[#C9A84C]/40" />
            </div>

            <p className="text-gray-600 text-sm leading-7 max-w-xl mx-auto mb-12">
              Trusted for quality, reliability, and consistent performance —
              focused on modern aesthetics and sustainable production.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Trusted Manufacturing",
                  desc: "Hubli-based manufacturer specializing in plastic & PTMT water taps.",
                },
                {
                  icon: "🛠️",
                  title: "Reliable Quality",
                  desc: "Designed for durability, corrosion resistance, and long-term performance.",
                },
                {
                  icon: "💰",
                  title: "Affordable Excellence",
                  desc: "Competitive pricing with consistent quality for dealers and distributors.",
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8"
                  style={{
                    border: "1px solid #f0eadb",
                    boxShadow:
                      "0 1px 3px rgba(58,15,69,0.08), 0 6px 24px rgba(58,15,69,0.05)",
                  }}
                >
                  <div className="text-4xl mb-4">{c.icon}</div>
                  <h4
                    className="text-[#7B1F8A] mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.45rem",
                      fontWeight: 700,
                    }}
                  >
                    {c.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-7">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}