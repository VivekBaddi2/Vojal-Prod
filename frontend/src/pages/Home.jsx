import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const API_BASE = import.meta.env.VITE_API_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/product`).then(r => r.json()).then(d => setProducts(d.slice(0, 8)));
    fetch(`${API_BASE}/api/gallery`).then(r => r.json()).then(d => setGallery(d.slice(0, 8)));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .marquee-track { display: flex; gap: 1.5rem; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      <Navbar />

      <div className="pt-16">

        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2a0a35 0%, #3a0f45 50%, #1a0628 100%)" }}>

          {/* Decorative background circles */}
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
          <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #7B1F8A, transparent)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className="relative text-center space-y-6 px-6 max-w-4xl mx-auto">

            {/* Top badge */}
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">
                Premium Plumbing Accessories
              </p>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl md:text-6xl font-bold leading-tight text-white">
              Crafted for Excellence<br />
              <span className="text-[#C9A84C]">Built to Last</span>
            </h1>

            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />

            <p className="text-white/70 text-base max-w-md mx-auto leading-relaxed">
              Premium water taps, shower heads & accessories trusted by professionals worldwide.
            </p>

            <div className="flex gap-4 justify-center pt-2 flex-wrap">
              <Link to="/products"
                className="bg-[#7B1F8A] text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors border-2 border-[#7B1F8A]">
                Explore Products
              </Link>
              <Link to="/contact"
                className="bg-transparent text-white px-7 py-3 rounded-lg text-sm font-medium border-2 border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#2a0a35] transition-colors">
                Get in Touch
              </Link>
            </div>

            {/* Bottom mini stats */}
            <div className="flex justify-center gap-8 pt-8 border-t border-white/10 mt-8 flex-wrap">
              {[["500+", "Products"], ["12+", "Countries"], ["98%", "Satisfaction"], ["15+", "Years"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-2xl font-semibold text-[#C9A84C]">{num}</div>
                  <div className="text-xs text-white/40 tracking-wide mt-0.5">{label}</div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: "linear-gradient(to bottom, transparent, #faf7fc)" }} />
        </section>

        {/* PRODUCTS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#faf7fc] py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45]">Our Products</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>
            <Link to="/products" className="text-sm text-[#C9A84C] font-medium hover:underline">View All →</Link>
          </div>
          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...products, ...products].map((p, i) => (
                <div key={i}
                  className="w-[240px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <img src={`${API_BASE}${p.image}`} alt={p.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2.5 py-1 rounded-full font-medium tracking-wide">
                      {p.category}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-semibold text-[#3a0f45] mt-2 text-sm truncate">{p.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
                    <div className="mt-3 text-right text-xs text-[#C9A84C] font-medium">Enquire →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45]">Gallery</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>
            <Link to="/gallery" className="text-sm text-[#C9A84C] font-medium hover:underline">View All →</Link>
          </div>
          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...gallery, ...gallery].map((g, i) => (
                <div key={i}
                  className="w-[260px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <img src={`${API_BASE}${g.image}`} alt={g.title} className="h-48 w-full object-cover" />
                  <div className="p-4 text-center">
                    <h4 style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-semibold text-[#3a0f45] text-sm truncate">{g.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{g.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* REVIEWS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#faf7fc] py-16 border-t border-[#f0eadb]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45]">What Our Clients Say</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mt-3 rounded" />
              <p className="text-gray-500 text-sm mt-3">Trusted by professionals, builders, and homeowners</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Ramesh Kulkarni", role: "Architect · Pune", text: "Vojal products are premium in quality and design. The finish and durability exceeded our expectations on every project." },
                { name: "Amit Verma", role: "Builder · Bangalore", text: "Excellent service and reliable products. Vojal has become our go-to brand for all plumbing accessories across sites." },
                { name: "Sneha Iyer", role: "Interior Designer · Mumbai", text: "Modern designs with outstanding performance. Highly recommended for residential and commercial projects alike." },
              ].map((r, i) => (
                <div key={i}
                  className="bg-white rounded-xl border border-[#f0eadb] border-t-4 border-t-[#C9A84C] p-6 space-y-3">
                  <div className="text-[#C9A84C] text-sm tracking-widest">★★★★★</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.text}</p>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-semibold text-[#3a0f45] text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA BAND */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative overflow-hidden py-20"
          style={{ background: "linear-gradient(135deg, #2a0a35 0%, #3a0f45 60%, #1a0628 100%)" }}>

          {/* Decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
          <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #7B1F8A, transparent)" }} />

          <div className="relative max-w-3xl mx-auto px-6 text-center space-y-5">
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">
              Ready to Work With Us?
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Let's Build Something<br />
              <span className="text-[#C9A84C]">Great Together</span>
            </h2>
            <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto rounded" />
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
              Whether you're a dealer, distributor, or architect — we have the right product and partnership for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-2">
              <Link to="/contact"
                className="bg-[#C9A84C] text-[#2a0a35] px-7 py-3 rounded-lg text-sm font-semibold hover:bg-[#b8943d] transition-colors">
                Contact Us
              </Link>
              <Link to="/products"
                className="bg-transparent text-white px-7 py-3 rounded-lg text-sm font-medium border-2 border-white/30 hover:border-white/60 transition-colors">
                Browse Products
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
      <Footer />
    </>
  );
}