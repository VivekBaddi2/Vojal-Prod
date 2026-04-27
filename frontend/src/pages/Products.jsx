import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const API_BASE = import.meta.env.VITE_API_URL;
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;


// ✅ Separate inner component to use hook inside provider
export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const fetchProducts = async (category = "") => {
    try {
      const url = category && category !== "All"
        ? `${API_BASE}/api/product?category=${category}`
        : `${API_BASE}/api/product`;
      const { data } = await axios.get(url);
      setProducts(data);
    } catch { setProducts([]); }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/product`);
      setCategories(["All", ...new Set(data.map(p => p.category))]);
    } catch { }
  };

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchProducts(selectedCategory); }, [selectedCategory]);

  const handleWhatsApp = async (product) => {
    try {
      if (!executeRecaptcha) return;
      setIsLoading(true);

      // ✅ Step 1 — Get token from Google
      const token = await executeRecaptcha("enquire");
      if (!token) {
        setIsLoading(false);
        return;
      }

      // ✅ Step 2 — Verify token on backend
      const verify = await axios.post(
        `${API_BASE}/api/captcha/verify`,
        { token }
      );

      if (!verify.data.success) {
        alert("Bot detected! Please try again.");
        setIsLoading(false);
        return;
      }

      // ✅ Step 3 — Open WhatsApp (only if verified)
      const message = `Hello Vojal Engineering! 👋\n\nI'm interested in:\n*Product:* ${product.title}\n*Category:* ${product.category}\n*Description:* ${product.description}\n\nPlease share more details. Thank you!`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSelectedProduct(null);
      setIsLoading(false);

    } catch (err) {
      console.error("Captcha error:", err);
      alert("Verification failed. Please try again.");
      setIsLoading(false);
    }
  };

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
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">Vojal Engineering</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-6xl font-bold">Our Products</h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm">Premium Water Taps & Plumbing Accessories</p>
          </motion.div>
        </section>

        {/* FILTER */}
        <div className="bg-white border-b border-[#f0eadb] sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium border-2 whitespace-nowrap transition-all ${selectedCategory === cat
                    ? "bg-[#7B1F8A] border-[#7B1F8A] text-white shadow-sm"
                    : "bg-white border-[#7B1F8A] text-[#7B1F8A] hover:bg-[#7B1F8A] hover:text-white"
                  }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#faf7fc] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-[#3a0f45]">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
              <p className="text-gray-400 text-xs mt-2">{products.length} product{products.length !== 1 ? "s" : ""} found</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-2xl bg-white">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-medium text-sm">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {products.map((p, i) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    onClick={() => setSelectedProduct(p)}
                    className="bg-white rounded-2xl border border-[#f0eadb] overflow-hidden cursor-pointer group hover:shadow-xl hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img src={`${API_BASE}${p.image}`} alt={p.title} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-[#7B1F8A] text-white text-[10px] px-3 py-1 rounded-full tracking-wide">{p.category}</div>
                      <div className="absolute inset-0 bg-[#7B1F8A]/0 group-hover:bg-[#7B1F8A]/10 transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all bg-[#7B1F8A] px-4 py-2 rounded-full shadow">View Details</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="font-semibold text-lg text-[#3a0f45] mb-1 truncate">{p.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] text-gray-300 uppercase tracking-wide">{p.category}</span>
                        <div className="flex items-center gap-2">
  {p.mrp > 0 && (
    <span className="text-[#7B1F8A] text-xs font-semibold">₹{p.mrp}</span>
  )}
  <span className="text-[#C9A84C] text-xs font-medium">Enquire →</span>
</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.93, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }} transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div className="relative">
                <img src={`${API_BASE}${selectedProduct.image}`} alt={selectedProduct.title} className="w-full h-60 object-cover" />
                <button onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow text-sm transition-colors">✕</button>
                <div className="absolute bottom-3 left-3 bg-[#7B1F8A] text-white text-[10px] px-3 py-1.5 rounded-full">{selectedProduct.category}</div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-[#3a0f45]">{selectedProduct.title}</h2>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mt-2 rounded" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{selectedProduct.description}</p>
               <div className="bg-[#faf7fc] rounded-xl p-3 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="text-[10px] text-gray-400 uppercase tracking-wide">Category</span>
    <span className="text-xs font-medium text-[#7B1F8A] bg-white px-3 py-1 rounded-full border border-[#ede0f7]">{selectedProduct.category}</span>
  </div>
  {selectedProduct.mrp > 0 && (
    <span className="text-sm font-bold text-[#7B1F8A]">₹{selectedProduct.mrp}</span>
  )}
</div>
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-[11px] text-gray-400 text-center">Contact us on WhatsApp for pricing & bulk orders</p>
                  <button
                    onClick={() => handleWhatsApp(selectedProduct)}
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm transition-all shadow-md cursor-pointer select-none active:scale-95 active:shadow-inner bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a84d] text-white hover:scale-105 disabled:opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {isLoading ? "Verifying..." : "Enquire on WhatsApp"}
                  </button>
                  <button onClick={() => setSelectedProduct(null)}
                    className="w-full border border-gray-200 text-gray-400 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      <Footer />
    </>
  );
}