import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";

const products = [];
const gallery = [];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="space-y-20 overflow-hidden">
        {/* HERO */}
        <section
          className="relative text-white py-20 px-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-6xl mx-auto text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Flowtec</h1>
            <p className="text-lg md:text-xl opacity-90">Premium Water Taps & Plumbing Accessories</p>
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

        {/* ABOUT SUMMARY */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold text-blue-900">
                About Flowtec
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-gray-700 leading-relaxed">
                Flowtec is a trusted manufacturer of premium water taps and plumbing accessories, delivering modern designs and long-lasting quality for residential, commercial, and industrial projects worldwide.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <Link to="/about" className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:gap-3 transition-all">
                  Read More <span>→</span>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg">
              <ul className="space-y-5">
                {["Premium-grade materials & finishes","Manufactured to international standards","Trusted by global distributors & clients","Reliable solutions for modern plumbing"].map((text, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*0.15 }} className="flex items-start gap-3 font-medium text-gray-800">
                    <span className="text-blue-900 text-lg">✔</span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* PRODUCTS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gray-50 py-14">
          <div className="max-w-6xl mx-auto px-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-blue-900">Our Products</h2>
              <Link to="/products" className="text-blue-900 font-semibold hover:underline">View All →</Link>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border border-dashed rounded-xl">Products will be available soon.</div>
            ) : (
              <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
                {products.map((p) => (
                  <motion.div key={p._id} whileHover={{ scale: 1.05 }} className="min-w-[260px] bg-white rounded-xl shadow">
                    <img src={p.image} alt={p.title} className="h-48 w-full object-cover rounded-t-xl"/>
                    <div className="p-4 text-center font-semibold">{p.title}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-blue-900">Gallery</h2>
            <Link to="/gallery" className="text-blue-900 font-semibold hover:underline">View Gallery →</Link>
          </div>

          {gallery.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed rounded-xl">Gallery images will be updated soon.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <motion.img key={g._id} whileHover={{ scale: 1.05 }} src={g.image} alt={g.title} className="h-64 w-full object-cover rounded-xl shadow"/>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
}
