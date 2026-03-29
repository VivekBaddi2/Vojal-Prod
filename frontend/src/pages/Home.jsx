import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

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
        <section className="relative min-h-[85vh] flex items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a0f45]/80 via-[#3a0f45]/60 to-[#C9A84C]/20" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className="relative text-center space-y-5 px-6">
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">Premium Plumbing Accessories</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl font-bold leading-tight">
              Crafted for Excellence<br /><span className="text-[#C9A84C]">Built to Last</span>
            </h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-base max-w-md mx-auto leading-relaxed">
              Premium water taps, shower heads & accessories trusted by professionals worldwide.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Link to="/products" className="bg-[#7B1F8A] text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors border-2 border-[#7B1F8A]">
                Explore Products
              </Link>
              <Link to="/contact" className="bg-transparent text-white px-7 py-3 rounded-lg text-sm font-medium border-2 border-[#C9A84C] hover:bg-[#C9A84C] transition-colors">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </section>

        {/* STATS */}
        <div className="bg-white border-b border-[#f0eadb]">
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-4 gap-6 text-center">
            {[["500+", "Products"], ["12+", "Countries"], ["98%", "Satisfaction"], ["15+", "Years"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#7B1F8A]">{num}</div>
                <div className="text-xs text-gray-400 tracking-wide mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#faf7fc] py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45]">Our Products</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>
            <Link to="/products" className="text-sm text-[#C9A84C] font-medium hover:underline">View All →</Link>
          </div>
          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...products, ...products].map((p, i) => (
                <div key={i} className="w-[240px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <img src={`${API_BASE}${p.image}`} alt={p.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2.5 py-1 rounded-full font-medium tracking-wide">{p.category}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="font-semibold text-[#3a0f45] mt-2 text-sm truncate">{p.title}</h3>
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
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45]">Gallery</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>
            <Link to="/gallery" className="text-sm text-[#C9A84C] font-medium hover:underline">View All →</Link>
          </div>
          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...gallery, ...gallery].map((g, i) => (
                <div key={i} className="w-[260px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <img src={`${API_BASE}${g.image}`} alt={g.title} className="h-48 w-full object-cover" />
                  <div className="p-4 text-center">
                    <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="font-semibold text-[#3a0f45] text-sm truncate">{g.title}</h4>
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
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45]">What Our Clients Say</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mx-auto mt-3 rounded" />
              <p className="text-gray-500 text-sm mt-3">Trusted by professionals, builders, and homeowners</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Ramesh Kulkarni", role: "Architect · Pune", text: "Vojal products are premium in quality and design. The finish and durability exceeded our expectations on every project." },
                { name: "Amit Verma", role: "Builder · Bangalore", text: "Excellent service and reliable products. Vojal has become our go-to brand for all plumbing accessories across sites." },
                { name: "Sneha Iyer", role: "Interior Designer · Mumbai", text: "Modern designs with outstanding performance. Highly recommended for residential and commercial projects alike." },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#f0eadb] border-t-4 border-t-[#C9A84C] p-6 space-y-3">
                  <div className="text-[#C9A84C] text-sm tracking-widest">★★★★★</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.text}</p>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif" }} className="font-semibold text-[#3a0f45] text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA BAND */}
        

      </div>
      <Footer />
    </>
  );
}