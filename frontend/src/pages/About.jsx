import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <>
      <Navbar />

      <div className="space-y-24 overflow-hidden">
      {/* HERO */}
<section
  className="relative text-white py-16 md:py-20 px-6 bg-cover bg-center"
  style={{ backgroundImage: `url(${heroImg})` }}
>
  <div className="absolute inset-0 bg-black/40"></div>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative max-w-6xl mx-auto text-center space-y-4"
  >
    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">About Flowtec</h1>
    <p className="text-lg md:text-xl opacity-90">
      Premium Water Taps & Plumbing Accessories Trusted Worldwide
    </p>
    <div className="pt-4">
      <Link
        to="/contact"
        className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
      >
        Get in Touch
      </Link>
    </div>
  </motion.div>
</section>

        {/* OUR STORY */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold text-blue-900">
              Our Story
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-gray-700 leading-relaxed">
              Flowtec started with a vision to deliver modern, high-quality plumbing solutions for homes and businesses. We specialize in water taps, shower heads, and accessories that combine style, durability, and performance.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }} className="text-gray-700 leading-relaxed">
              Our international clients trust us for innovative designs, sustainable manufacturing, and reliable products that meet global standards.
            </motion.p>
          </div>

          {/* Core Values Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.03 }} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Core Values</h3>
            <ul className="space-y-4 font-medium text-gray-800">
              {[
                "Premium-grade materials & finishes",
                "Manufactured to international standards",
                "Trusted by global distributors & clients",
                "Reliable solutions for modern plumbing",
              ].map((text, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*0.15 }} className="flex items-start gap-3">
                  <span className="text-blue-900 text-lg">✔</span>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* WHY CHOOSE US */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6 space-y-10 text-center">
            <h2 className="text-3xl font-bold text-blue-900">Why Choose Flowtec?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Our products are trusted globally for quality, design, and reliability. We focus on modern aesthetics, sustainable production, and long-lasting performance.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {[
                { title: "Global Trust", desc: "Used and trusted by international clients." },
                { title: "Durable Quality", desc: "Premium materials that last for decades." },
                { title: "Innovative Design", desc: "Modern, sleek, and functional designs." },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center py-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to work with Flowtec?</h2>
          <p className="text-gray-700 mb-6">Contact us today to discuss your project and explore our premium plumbing solutions.</p>
          <motion.a href="/contact" whileHover={{ scale: 1.05 }} className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
            Get in Touch
          </motion.a>
        </motion.section>
      </div>
    </>
  );
}
