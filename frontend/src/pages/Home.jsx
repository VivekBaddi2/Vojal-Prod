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

  useEffect(() => {
    fetch(`${API_BASE}/api/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .finally(() => setLoadingProducts(false));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/gallery`)
      .then((res) => res.json())
      .then((data) => setGallery(data.slice(0, 6)))
      .finally(() => setLoadingGallery(false));
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
            <h1 className="text-4xl md:text-5xl font-bold">Flowtec</h1>
            <p className="text-lg opacity-90">
              Premium Water Taps & Plumbing Accessories
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
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
          className="bg-gray-50 py-14"
        >
          <div className="w-full px-6 space-y-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h2 className="text-3xl font-bold text-blue-900">Our Products</h2>
              <Link to="/products" className="font-semibold text-blue-900">
                View All →
              </Link>
            </div>

            {loadingProducts ? (
              <div className="text-center py-10 text-gray-500">
                Loading products...
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="flex gap-6 marquee">
                  {[...products, ...products, ...products].map((p, i) => (
                    <div
                      key={p._id + i}
                      className="w-[280px] bg-white rounded-xl shadow flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={`${API_BASE}${p.image}`}
                        alt={p.title}
                        className="h-48 w-full object-cover"
                      />

                      <div className="p-4 text-center space-y-1">
                        <h3 className="font-bold text-blue-900 truncate">
                          {p.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
          className="py-14"
        >
          <div className="w-full px-6 space-y-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h2 className="text-3xl font-bold text-blue-900">Gallery</h2>
              <Link to="/gallery" className="font-semibold text-blue-900">
                View Gallery →
              </Link>
            </div>

            {loadingGallery ? (
              <div className="text-center py-10 text-gray-500">
                Loading gallery...
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="flex gap-6 marquee">
                  {[...gallery, ...gallery, ...gallery].map((g, i) => (
                    <div
                      key={g._id + i}
                      className="w-[280px] bg-white rounded-xl shadow flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={`${API_BASE}${g.image}`}
                        alt={g.title}
                        className="h-56 w-full object-cover"
                      />

                      <div className="p-4 text-center space-y-1">
                        <h4 className="font-semibold text-blue-900 truncate">
                          {g.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {g.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        
{/* ================= REVIEWS ================= */}
<motion.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-gray-50 py-16"
>
  <div className="max-w-7xl mx-auto px-6 space-y-10">

    {/* Heading */}
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold text-blue-900">
        What Our Clients Say
      </h2>
      <p className="text-gray-600">
        Trusted by professionals, builders, and homeowners
      </p>
    </div>

    {/* Reviews Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex text-yellow-400 text-lg">
          ★★★★★
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Flowtec products are premium in quality and design. 
          The finish and durability exceeded our expectations.
        </p>
        <div>
          <p className="font-semibold text-blue-900">Ramesh Kulkarni</p>
          <p className="text-xs text-gray-500">Architect • Pune</p>
        </div>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex text-yellow-400 text-lg">
          ★★★★★
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Excellent service and reliable products. 
          Flowtec has become our go-to brand for plumbing accessories.
        </p>
        <div>
          <p className="font-semibold text-blue-900">Amit Verma</p>
          <p className="text-xs text-gray-500">Builder • Bangalore</p>
        </div>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex text-yellow-400 text-lg">
          ★★★★★
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Modern designs with outstanding performance. 
          Highly recommended for both residential and commercial projects.
        </p>
        <div>
          <p className="font-semibold text-blue-900">Sneha Iyer</p>
          <p className="text-xs text-gray-500">Interior Designer • Mumbai</p>
        </div>
      </div>

    </div>
  </div>
</motion.section>

      </div>

      {/* ================= PERFECT MARQUEE ================= */}
      <style>{`
  :root {
    --carousel-speed: 28s; /* balanced: not fast, not slow */
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-33.333%);
    }
  }

  .marquee {
    width: max-content;
    animation: marquee var(--carousel-speed) linear infinite;
  }
`}</style>

    </>

    
  );
}
