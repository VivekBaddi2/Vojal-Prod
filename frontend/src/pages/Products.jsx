import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";
import axios from "axios";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/product");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]); // fallback to empty
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Our Products</h1>
            <p className="text-lg md:text-xl opacity-90">Premium Water Taps & Plumbing Accessories</p>
          </motion.div>
        </section>

        {/* PRODUCTS GRID */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 py-14"
        >
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed rounded-xl">
              Products will be available soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={`http://localhost:4000${p.image}`}
                    alt={p.title}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4 space-y-2 text-center">
                    <h3 className="font-bold text-lg text-blue-900">{p.title}</h3>
                    <p className="text-gray-700">{p.description}</p>
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
