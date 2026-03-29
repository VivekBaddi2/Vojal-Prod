import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

export default function Contact() {
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
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto" />
            <p className="text-white/75 text-sm">Reach out for inquiries, support, or business collaborations</p>
          </motion.div>
        </section>

        {/* CONTACT GRID */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#f0eadb] shadow-sm">
            <iframe
              title="Vojal Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.372308884277!2d75.11147179999999!3d15.35631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7036088cd7f%3A0xc294080da817975e!2sVojal%20Engineering!5e0!3m2!1sen!2sin!4v1774263930365!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-white rounded-2xl border border-[#f0eadb] border-t-4 border-t-[#C9A84C] p-10 space-y-6 shadow-sm">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-semibold text-[#3a0f45]">Get in Touch</h2>
              <div className="w-9 h-0.5 bg-[#C9A84C] mt-2 rounded" />
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">We'd love to hear from you! Reach out for product inquiries, partnerships, or support.</p>
            </div>
            {[
              { label: "Address", value: "Vojal Engineering\nCollage 2nd Gate, C529, Industrial Estate Gokul Road near GTTC, Hubballi, Karnataka" },
              { label: "Phone", value: "+91 98765 43210" },
              { label: "Email", value: "info@vojal.com" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] text-[#C9A84C] font-medium tracking-[0.1em] uppercase mb-1">{label}</p>
                <p className="text-sm text-[#3a0f45] font-medium leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-[#f5eef8]">
              <p className="text-[11px] text-[#C9A84C] font-medium tracking-[0.1em] uppercase mb-2">Business Hours</p>
              <div className="bg-[#faf7fc] rounded-xl px-4 py-3 border-l-4 border-[#C9A84C]">
                <p className="text-sm text-[#3a0f45]">Mon – Sat : 9:30 AM – 6:30 PM</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}