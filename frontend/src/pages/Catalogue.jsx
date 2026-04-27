import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const API_BASE = import.meta.env.VITE_API_URL;

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
              className="text-4xl md:text-6xl font-bold"
            >
              Product Catalogues
            </h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm">
              Download our product catalogues for detailed specifications
            </p>
          </motion.div>
        </section>

        {/* CATALOGUES */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 px-6 bg-[#faf7fc]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-medium mb-2">
                Downloads
              </p>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-semibold text-[#3a0f45]"
              >
                All Catalogues
              </h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-20 text-gray-400 text-sm">
                Loading catalogues...
              </div>
            )}

            {/* Empty */}
            {!loading && catalogues.length === 0 && (
              <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-2xl">
                <p className="text-4xl mb-3">📄</p>
                <p className="text-sm font-medium">
                  No catalogues available yet.
                </p>
              </div>
            )}

            {/* Grid */}
            {!loading && catalogues.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalogues.map((c, i) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-[#f0eadb] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#f3e8fa] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        📄
                      </div>
                      <div>
                        <h3
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="font-semibold text-[#3a0f45] text-sm leading-tight"
                        >
                          {c.title}
                        </h3>
                        {c.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {c.description}
                          </p>
                        )}
                        <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2 py-0.5 rounded-full mt-1 inline-block">
                          {c.category || "General"}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`${API_BASE}/api/catalogue/download/${c.file.split("/").pop()}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[#7B1F8A] to-[#9b2db0] text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-95"
                    >
                      <span>⬇</span>
                      <span>Download PDF</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}
