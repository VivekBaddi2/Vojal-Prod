import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const API_BASE = "http://localhost:4000";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  /* Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/product`);
        const data = await res.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Product fetch failed", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  /* Fetch gallery */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gallery`);
        const data = await res.json();
        setGallery(data.slice(0, 6));
      } catch (err) {
        console.error("Gallery fetch failed", err);
      } finally {
        setLoadingGallery(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      <Navbar />

      <div className="space-y-20 overflow-hidden">

        {/* ================= HERO ================= */}
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
              Flowtec
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Premium Water Taps & Plumbing Accessories
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Get in Touch
            </Link>
          </motion.div>
        </section>

        {/* ================= PRODUCTS ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 py-14"
        >
          <div className="max-w-6xl mx-auto px-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-blue-900">Our Products</h2>
              <Link to="/products" className="font-semibold text-blue-900">
                View All →
              </Link>
            </div>

            {loadingProducts ? (
              <div className="text-center py-10 text-gray-500">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border border-dashed rounded-xl">
                Products will be available soon.
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
                {products.map((p) => (
                  <motion.div
                    key={p._id}
                    whileHover={{ scale: 1.05 }}
                    className="min-w-[280px] bg-white rounded-xl shadow overflow-hidden"
                  >
                    <img
                      src={`${API_BASE}${p.image}`}
                      alt={p.title}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4 text-center space-y-1">
                      <h3 className="font-bold text-blue-900">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* ================= GALLERY ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 pb-20 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-blue-900">Gallery</h2>
            <Link to="/gallery" className="font-semibold text-blue-900">
              View Gallery →
            </Link>
          </div>

          {loadingGallery ? (
            <div className="text-center py-10 text-gray-500">
              Loading gallery...
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-10 text-gray-500 border border-dashed rounded-xl">
              Gallery images will be updated soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <motion.div
                  key={g._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <img
                    src={`${API_BASE}${g.image}`}
                    alt={g.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-4 text-center space-y-1">
                    <h4 className="font-semibold text-blue-900">
                      {g.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {g.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
}
