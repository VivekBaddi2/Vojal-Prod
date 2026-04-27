import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const API_BASE = import.meta.env.VITE_API_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleWhatsApp = async (product) => {
    try {
      if (!executeRecaptcha) return;

      setIsLoading(true);

      const token = await executeRecaptcha("enquire");

      const verify = await axios.post(`${API_BASE}/api/captcha/verify`, {
        token,
      });

      if (!verify.data.success) {
        alert("Bot detected! Please try again.");
        setIsLoading(false);
        return;
      }

      const message = `Hello Vojal Engineering! 👋

I'm interested in:
*Product:* ${product.title}
*Category:* ${product.category}
*Description:* ${product.description}

Please share more details. Thank you!`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
      );

      setSelectedProduct(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      alert("Verification failed.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/product`)
      .then((r) => r.json())
      .then((d) => setProducts(d.slice(0, 8)));

    fetch(`${API_BASE}/api/gallery`)
      .then((r) => r.json())
      .then((d) => setGallery(d.slice(0, 8)));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          font-family: 'DM Sans', sans-serif;
        }

        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <Navbar />

      <div className="pt-16">
        {/* HERO */}
        <section
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #2a0a35 0%, #3a0f45 50%, #1a0628 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative text-center space-y-6 px-6 max-w-4xl mx-auto"
          >
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl md:text-6xl font-bold leading-tight text-white"
            >
              Crafted for Excellence
              <br />
              <span className="text-[#C9A84C]">Built to Last</span>
            </h1>

            <p className="text-white/70 text-base max-w-md mx-auto leading-relaxed">
              Premium water taps, shower heads & accessories trusted by
              professionals worldwide.
            </p>

            <div className="flex gap-4 justify-center flex-wrap pt-2">
              <Link
                to="/products"
                className="bg-[#7B1F8A] text-white px-7 py-3 rounded-lg text-sm font-medium"
              >
                Explore Products
              </Link>

              <Link
                to="/contact"
                className="border border-[#C9A84C] text-white px-7 py-3 rounded-lg text-sm font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </section>

        {/* PRODUCTS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white py-16 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl font-semibold text-[#3a0f45]"
              >
                Our Products
              </h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
            </div>

            <Link
              to="/products"
              className="text-sm text-[#C9A84C] font-medium hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...products, ...products].map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedProduct(p)}
                  className="w-[240px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={`${API_BASE}${p.image}`}
                    alt={p.title}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4">
                    <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2.5 py-1 rounded-full font-medium tracking-wide">
                      {p.category}
                    </span>

                    <h3
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="font-semibold text-[#3a0f45] mt-2 text-sm truncate"
                    >
                      {p.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-3 text-right text-xs text-[#C9A84C] font-medium">
                      Enquire →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl font-semibold text-[#3a0f45]"
            >
              Gallery
            </h2>

            <Link
              to="/gallery"
              className="text-sm text-[#C9A84C] font-medium hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-hidden px-6">
            <div className="marquee-track">
              {[...gallery, ...gallery].map((g, i) => (
                <div
                  key={i}
                  className="w-[260px] flex-shrink-0 bg-white rounded-xl border border-[#f0eadb] overflow-hidden"
                >
                  <img
                    src={`${API_BASE}${g.image}`}
                    alt={g.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* PRODUCT ENQUIRY MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`${API_BASE}${selectedProduct.image}`}
                  alt={selectedProduct.title}
                  className="w-full h-60 object-cover"
                />

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow text-sm transition-colors"
                >
                  ✕
                </button>

                <div className="absolute bottom-3 left-3 bg-[#7B1F8A] text-white text-[10px] px-3 py-1.5 rounded-full">
                  {selectedProduct.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                <div>
                  <h2
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-2xl font-semibold text-[#3a0f45]"
                  >
                    {selectedProduct.title}
                  </h2>

                  <div className="w-8 h-0.5 bg-[#C9A84C] mt-2 rounded" />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* CATEGORY + PRICE */}
                <div className="bg-[#faf7fc] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                      Category
                    </span>

                    <span className="text-xs font-medium text-[#7B1F8A] bg-white px-3 py-1 rounded-full border border-[#ede0f7]">
                      {selectedProduct.category}
                    </span>
                  </div>

                  {selectedProduct.mrp > 0 && (
                    <span className="text-sm font-bold text-[#7B1F8A]">
                      ₹{selectedProduct.mrp}
                    </span>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-[11px] text-gray-400 text-center">
                    Contact us on WhatsApp for pricing & bulk orders
                  </p>

                  <button
                    onClick={() => handleWhatsApp(selectedProduct)}
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm transition-all shadow-md cursor-pointer select-none active:scale-95 active:shadow-inner bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a84d] text-white hover:scale-105 disabled:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>

                    {isLoading ? "Verifying..." : "Enquire on WhatsApp"}
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full border border-gray-200 text-gray-400 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                  >
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
