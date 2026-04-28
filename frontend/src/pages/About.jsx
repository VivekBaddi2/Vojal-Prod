import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  const [activeTab, setActiveTab] = useState("about");
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <Navbar />
      <div className="pt-16 text-[15px] leading-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* HERO */}
        <section className="relative min-h-[55vh] flex items-center justify-center text-white bg-cover bg-center"
        >
          <div style={{
            background:
              "linear-gradient(135deg, #2a0a35 0%, #3a0f45 50%, #1a0628 100%)",
          }} className="absolute inset-0" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="relative text-center space-y-4 px-6">
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">Vojal Engineering</p>
            <h1 className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About Us
            </h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm max-w-md mx-auto leading-relaxed">
              Trusted manufacturer from Hubli delivering reliable, affordable, and long-lasting water tap solutions.
            </p>
            <Link to="/contact" className="inline-block bg-[#7B1F8A] text-white px-6 py-3 rounded-lg text-sm font-semibold border-2 border-[#7B1F8A] hover:bg-[#5c1a6e] transition-colors mt-2">
              Get in Touch
            </Link>
          </motion.div>
        </section>

        {/* STORY */}
        {/* TABS SECTION */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 py-20"
        >
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 border-b-2 border-[#ede0f7] mb-12">
            {[
              { key: "about", label: "About Us" },
              { key: "mission", label: "Mission" },
              { key: "vision", label: "Vision" },
              { key: "values", label: "Core Values" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-all duration-200
          ${activeTab === tab.key
                    ? "border-[#7B1F8A] text-[#7B1F8A] font-semibold"
                    : "border-transparent text-gray-400 hover:text-[#3a0f45]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-5 max-w-xl">
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl font-semibold text-[#3a0f45]">
                  Our Story
                  <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
                </h2>
                <p className="text-gray-600 text-base leading-6">
                  Vojal Engineering is a trusted manufacturer of high-quality plastic and PTMT water taps, proudly based in Hubli, Karnataka. With a strong commitment to innovation, durability, and customer satisfaction, we deliver reliable water solutions designed for modern homes and commercial spaces.
                </p>
                <div className="w-16 h-0.5 bg-[#C9A84C] my-4"></div>

                <p className="text-gray-600 text-base leading-6">
                  Founded with a vision to make premium-quality taps accessible and affordable, we combine advanced manufacturing techniques with strict quality control to ensure every product meets industry standards. Our taps are built for durability, corrosion resistance, and long-lasting performance in diverse water conditions.
                </p>

                <p className="text-gray-600 text-base leading-6">
                  We focus on continuous improvement and customer-centric growth by offering products that balance functionality with modern design. Our wide product range serves dealers, distributors, and customers across Karnataka and beyond.
                </p>

                <p className="text-gray-600 text-base leading-6">
                  Our mission is simple — to become a preferred brand in the water tap industry by delivering value, reliability, and trust in every drop.
                </p>
                <div className="bg-white border-l-4 border-[#7B1F8A] p-4 rounded-lg">
                  <p className="text-[#3a0f45] font-medium text-sm">
                    Delivering value, reliability, and trust in every drop.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#ede0f7] border-l-4 border-l-[#C9A84C] rounded-2xl p-8">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-xl font-semibold text-[#7B1F8A] mb-6">
                  At a Glance
                </h3>
                {[
                  "Hubli, Karnataka based manufacturer",
                  "Plastic & PTMT water tap specialists",
                  "Stringent quality control on every product",
                  "Serving dealers, distributors across Karnataka & beyond",
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-[#7B1F8A] flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-sm text-[#3a0f45] leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MISSION TAB */}
          {activeTab === "mission" && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-[#ede0f7] flex items-center justify-center text-4xl mb-6">🎯</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45] mb-3">
                Our Mission
              </h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mb-6 rounded" />
              <div className="bg-white border border-[#ede0f7] border-l-4 border-l-[#7B1F8A] rounded-2xl p-8 text-left">
                <p className="text-gray-600 text-base leading-relaxed">
                  To deliver <span className="text-[#7B1F8A] font-medium">precision-engineered water tap solutions</span> that
                  combine durability, functionality, and design excellence, ensuring maximum value for
                  customers and business growth for our partners.
                </p>
              </div>
            </motion.div>
          )}

          {/* VISION TAB */}
          {activeTab === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-[#fdf5e0] flex items-center justify-center text-4xl mb-6">🔭</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45] mb-3">
                Our Vision
              </h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mb-6 rounded" />
              <div className="bg-white border border-[#ede0f7] border-l-4 border-l-[#C9A84C] rounded-2xl p-8 text-left">
                <p className="text-gray-600 text-base leading-relaxed">
                  To establish Vojal Engineering as a <span className="text-[#7B1F8A] font-medium">benchmark brand</span> in
                  the PTMT and plastic tap industry, recognized for innovation, quality leadership,
                  and nationwide presence.
                </p>
              </div>
            </motion.div>
          )}

          {/* CORE VALUES TAB */}
          {activeTab === "values" && (
            <motion.div
              key="values"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl font-semibold text-[#3a0f45] mb-3">
                  Core Values
                </h2>
                <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto rounded" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🏆", title: "Quality First", desc: "Every tap we manufacture undergoes strict quality checks to ensure long-lasting reliability and durability." },
                  { icon: "🤝", title: "Customer Commitment", desc: "Our customers and partners are at the heart of everything we do. We strive to add real value to their business." },
                  { icon: "🔒", title: "Integrity & Trust", desc: "We believe in transparent and ethical business practices, building long-term relationships driven by honesty." },
                  { icon: "💡", title: "Innovation & Improvement", desc: "We continuously upgrade our designs, materials, and processes to stay ahead and deliver better products." },
                  { icon: "💰", title: "Value for Money", desc: "We offer the right balance of quality and affordability, keeping products competitive and profitable for partners." },
                  { icon: "⚙️", title: "Reliability & Consistency", desc: "Our partners can depend on us for stable performance, consistent quality, and dependable supply." },
                  { icon: "📈", title: "Growth Through Partnership", desc: "We believe in growing together by supporting our dealers and distributors to create mutual success." },
                ].map((val, i) => (
                  <div key={i}
                    className="bg-white border border-[#ede0f7] border-b-4 border-b-[#C9A84C] rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-3">{val.icon}</div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-base font-semibold text-[#7B1F8A] mb-2">
                      {val.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-6">{val.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* WHY CHOOSE */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-white border-t border-b border-[#f0eadb] py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45] mb-3">Why Choose Vojal?</h2>
            <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mb-4 rounded" />
            <p className="text-gray-600 text-sm leading-6 max-w-md mx-auto mb-12">
              Trusted for quality, reliability, and consistent performance — focused on modern aesthetics and sustainable production.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Trusted Manufacturing",
                  desc: "Hubli-based manufacturer specializing in plastic & PTMT water taps."
                },
                {
                  icon: "🛠️",
                  title: "Reliable Quality",
                  desc: "Designed for durability, corrosion resistance, and long-term performance."
                },
                {
                  icon: "💰",
                  title: "Affordable Excellence",
                  desc: "Competitive pricing with consistent quality for dealers and distributors."
                }
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#f0eadb] border-b-4 border-b-[#C9A84C] p-7 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-4">{c.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-[#7B1F8A] mb-2">{c.title}</h4>
                  <p className="text-gray-600 text-base leading-6">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>


      </div>
      <Footer />
    </>
  );
}