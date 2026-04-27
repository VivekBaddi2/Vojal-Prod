import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  message: ""
});

const [loading, setLoading] = useState(false);
const { executeRecaptcha } = useGoogleReCaptcha();

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
  try {
    if (!executeRecaptcha) return;

    setLoading(true);

    const token = await executeRecaptcha("contact_form");

    await axios.post(`${API_BASE}/api/contact`, {
      ...form,
      token
    });

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

  } catch (err) {
    console.error(err);
    alert("Failed to send message");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <Navbar />

      <div className="pt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        <section className="relative min-h-[60vh] flex items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}>

          <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a35]/90 via-[#3a0f45]/80 to-[#C9A84C]/20" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center space-y-5 px-6"
          >
            <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase">
              Vojal Engineering
            </p>

            <h1 style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-6xl font-bold">
              Let’s Connect
            </h1>

            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />

            <p className="text-white/70 text-sm max-w-md mx-auto">
              Reach out for product enquiries, dealership opportunities or support.
            </p>
          </motion.div>
        </section>


   <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-7xl mx-auto px-6 py-20"
>
  <div className="grid md:grid-cols-2 gap-10 items-start">

    {/* LEFT - MAP */}
    <div className="rounded-2xl overflow-hidden border border-[#f0eadb] shadow-sm h-[520px]">
      <iframe
        title="Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.372308884277!2d75.11147179999999!3d15.35631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7036088cd7f%3A0xc294080da817975e!2sVojal%20Engineering!5e0!3m2!1sen!2sin!4v1774263930365!5m2!1sen!2sin"
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>

    {/* RIGHT - CONTACT FORM */}
    <div className="bg-white rounded-2xl border border-[#f0eadb] p-10 shadow-sm">

      <h2 style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-3xl font-semibold text-[#3a0f45]">
        Contact Us
      </h2>

     

      {/* ADDRESS */}
      <div className="mb-6 space-y-2 text-sm text-gray-600">
        <p className="font-medium text-[#3a0f45]">Head Office</p>
        <p>
          C 529, 5th Cross, 2nd Gate, Industrial Estate, Gokul Road, Hubballi,<br />
          Karnataka–580030
        </p>
        <p>📞 +91 8217534640</p>
        <p>✉️ vojalindia@gmail.com</p>
      </div>

      {/* FORM */}
      <div className="space-y-4">
         <p className="text-gray-400 text-sm mt-2 mb-6">
        Reach out for Enquiries, Dealership or collaborations.
      </p>

        <input
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Name"
  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]"
/>

<input
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Email"
  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]"
/>

<textarea
  name="message"
  value={form.message}
  onChange={handleChange}
  placeholder="Message"
  rows="4"
  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C]"
/>

        

       <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-[#7B1F8A] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition"
>
  {loading ? "Sending..." : "Submit"}
</button>

      </div>
    </div>

  </div>
</motion.section>


        

     

      </div>

      <Footer />
    </>
  );
}