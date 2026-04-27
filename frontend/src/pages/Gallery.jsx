import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const API_BASE = import.meta.env.VITE_API_URL;
export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/gallery`)
      .then(({ data }) => setGallery(data))
      .catch(() => setError("Failed to load gallery"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <Navbar />
      <div className="pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* HERO */}
        <section
          className="relative min-h-[55vh] flex items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a0f45]/80 via-[#3a0f45]/60 to-[#C9A84C]/20" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center space-y-4 px-6"
          >
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">
              Vojal Engineering
            </p>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Our Gallery
            </h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm">
              Explore Our Work & Client Collaborations
            </p>
          </motion.div>
        </section>

        {/* GRID */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 py-16"
        >
          {loading && (
            <div className="text-center py-16 text-gray-400 text-sm">
              Loading gallery...
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-16 text-red-400 text-sm">
              {error}
            </div>
          )}
          {!loading && !error && gallery.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm border-2 border-dashed rounded-2xl">
              Gallery images will be updated soon.
            </div>
          )}
          {!loading && !error && gallery.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {gallery.map((g, i) => (
                <motion.div
                  key={g._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-[#f0eadb] overflow-hidden group hover:shadow-xl hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={`${API_BASE}${g.image}`}
                      alt={g.title}
                      className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-semibold text-[#3a0f45] text-base"
                    >
                      {g.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
      <Footer />
    </>
  );
}
