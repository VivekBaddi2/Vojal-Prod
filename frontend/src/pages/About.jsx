import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <Navbar />
      <div className="pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        <section className="relative min-h-[55vh] flex items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a0f45]/80 via-[#3a0f45]/60 to-[#C9A84C]/20" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="relative text-center space-y-4 px-6">
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">About Vojal Engineering</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold">
              Premium Water Taps &<br />Plumbing Accessories
            </h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm max-w-md mx-auto leading-relaxed">
              Trusted worldwide for innovative design, sustainable manufacturing, and lasting performance.
            </p>
            <Link to="/contact" className="inline-block bg-[#7B1F8A] text-white px-6 py-3 rounded-lg text-sm font-medium border-2 border-[#7B1F8A] hover:bg-[#5c1a6e] transition-colors mt-2">
              Get in Touch
            </Link>
          </motion.div>
        </section>

        {/* STORY */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-5">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45]">
              Our Story
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Vojal started with a vision to deliver modern, high-quality plumbing solutions for homes and businesses. We specialize in water taps, shower heads, and accessories that combine style, durability, and performance.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our international clients trust us for innovative designs, sustainable manufacturing, and reliable products that meet global standards — built for decades of use.
            </p>
          </div>
          <div className="bg-[#faf7fc] border border-[#ede0f7] border-l-4 border-l-[#C9A84C] rounded-2xl p-8">
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold text-[#7B1F8A] mb-6">Core Values</h3>
            {["Premium-grade materials & finishes", "Manufactured to international standards", "Trusted by global distributors & clients", "Reliable solutions for modern plumbing"].map((v, i) => (
              <div key={i} className="flex items-start gap-3 mb-4">
                <div className="w-5 h-5 rounded-full bg-[#7B1F8A] flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5">✓</div>
                <span className="text-sm text-[#3a0f45] leading-relaxed">{v}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* WHY CHOOSE */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#faf7fc] border-t border-b border-[#f0eadb] py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45] mb-3">Why Choose Vojal?</h2>
            <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mb-4 rounded" />
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-12 leading-relaxed">
              Trusted globally for quality, design, and reliability — focused on modern aesthetics and sustainable production.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🌐", title: "Global Trust", desc: "Used and trusted by international clients and distributors across 12+ countries." },
                { icon: "🏆", title: "Durable Quality", desc: "Premium brass and chrome materials engineered to last for decades." },
                { icon: "✨", title: "Innovative Design", desc: "Modern, sleek, and functional designs that elevate every space." },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#f0eadb] border-b-4 border-b-[#C9A84C] p-7 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-4">{c.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-[#7B1F8A] mb-2">{c.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
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