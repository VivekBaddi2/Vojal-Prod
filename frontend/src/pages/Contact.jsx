import { motion } from "framer-motion";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = import.meta.env.VITE_API_URL;
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

// ─── Icons ─────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);


// ─── Contact Info Card ──────────────────────────────────────────────────────────
function InfoChip({ icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-3 p-4 rounded-xl transition-all group/chip"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5"
        style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium mb-0.5">{label}</p>
        <p className="text-white/85 text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a> : <div>{inner}</div>;
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);
const [focused, setFocused] = useState("");
const { executeRecaptcha } = useGoogleReCaptcha();

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const inputStyle = (name) => ({
    width: "100%",
    background: "#faf7fc",
    border: `1.5px solid ${focused === name ? "#7B1F8A" : "#ede0f7"}`,
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "0.875rem",
    color: "#3a0f45",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused === name ? "0 0 0 3px rgba(123,31,138,0.1)" : "none",
    fontFamily: "'DM Sans', sans-serif",
  });

const handleWhatsApp = async () => {
  try {
    if (!executeRecaptcha) return;
    setLoading(true);
  const token = await executeRecaptcha("enquire");
    if (!token) { setLoading(false); return; }

    const verify = await axios.post(`${API_BASE}/api/captcha/verify`, { token });
    if (!verify.data.success) {
      alert("Bot detected! Please try again.");
      setLoading(false);
      return;
    }

const waMessage = `New Enquiry%0a%0a*Name:* ${form.name}%0a*Phone:* ${form.phone}%0a*Email:* ${form.email ? form.email : "Not provided"}%0a*Message:* ${form.message}`;
window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
setSent(true);
setForm({ name: "", phone: "", email: "", message: "" });
  } catch (err) {
    console.error("WhatsApp error:", err);
    alert("Verification failed. Please try again.");
  } finally {
    setLoading(false);
  }
}; 



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }
input::placeholder, textarea::placeholder { color: #b8a8c8; }
textarea { resize: none; }
      `}</style>

      <Navbar />

      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section
          className="hero-grain relative overflow-hidden flex items-center justify-center text-white"
          style={{
            minHeight: "58vh",
            background: "linear-gradient(140deg, #1a0628 0%, #3a0f45 45%, #2a0a35 70%, #1d0830 100%)",
            paddingTop: "64px",
          }}
        >
          {/* Glow orbs */}
          <div className="absolute pointer-events-none" style={{ width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,31,138,0.25) 0%, transparent 70%)", top: "-120px", right: "-100px" }} />
          <div className="absolute pointer-events-none" style={{ width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", bottom: "-80px", left: "-60px" }} />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center px-6 py-16 space-y-5 max-w-2xl"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10" style={{ background: "#C9A84C" }} />
           <p className="text-xl sm:text-3xl tracking-[0.25em] uppercase font-semibold" style={{ color: "#C9A84C" }}>
                Vojal Engineering
              </p>
              <div className="h-px w-10" style={{ background: "#C9A84C" }} />
            </div>

            <h1
              className="text-white leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Let's Connect
            </h1>

            <p className="text-white/60 text-sm tracking-wide max-w-md mx-auto">
              Reach out for product enquiries, dealership opportunities or support
            </p>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <div style={{ background: "linear-gradient(90deg, #2a0a35, #3a0f45)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-8 flex-wrap">
            {[
              { label: "Response Time", value: "< 24hrs" },
              
              { label: "Years of Trust", value: "7+" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C9A84C" }}>
                  {s.value}
                </span>
                <span className="text-white/50 text-xs tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <section
          className="py-12 md:py-20 px-6"
          style={{ background: "linear-gradient(180deg, #faf7fc 0%, #f8f4ff 100%)" }}
        >
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="mb-10">
              <h2
                className="text-[#3a0f45]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Get in Touch
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-[2px] w-10 rounded" style={{ background: "#C9A84C" }} />
                <div className="h-[2px] w-3 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">

              {/* ── LEFT — Info + Map ── */}
            <motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="flex flex-col space-y-5"
>
                {/* Info card */}
                <div
                  className="rounded-2xl p-6 space-y-3"
                  style={{
                    background: "linear-gradient(135deg, #2a0a35 0%, #3a0f45 100%)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    boxShadow: "0 8px 32px rgba(42,10,53,0.2)",
                  }}
                >
                  {/* Card heading */}
                  <div className="mb-5">
                    <p
                      className="text-white font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}
                    >
                      Head Office
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="h-[2px] w-6 rounded" style={{ background: "#C9A84C" }} />
                      <div className="h-[2px] w-2 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
                    </div>
                  </div>

                  <InfoChip
                    icon={<MapPinIcon />}
                    label="Address"
                    value="C 529, 5th Cross, 2nd Gate, Industrial Estate, Gokul Road, Hubballi, Karnataka – 580030"
                  />
                  <InfoChip
                    icon={<PhoneIcon />}
                    label="Phone"
                    value="+91 82175 34640"
                    href="tel:+918217534640"
                  />
                  <InfoChip
                    icon={<MailIcon />}
                    label="Email"
                    value="vojalindia@gmail.com"
                    href="mailto:vojalindia@gmail.com"
                  />
                </div>

                {/* Map */}
              <div
  className="rounded-2xl overflow-hidden flex-1"
  style={{
    border: "1px solid #ede0f7",
    boxShadow: "0 4px 20px rgba(58,15,69,0.08)",
    minHeight: "280px",
  }}
>
                  <iframe
                    title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.372308884277!2d75.11147179999999!3d15.35631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7036088cd7f%3A0xc294080da817975e!2sVojal%20Engineering!5e0!3m2!1sen!2sin!4v1774263930365!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </motion.div>

            
             {/* ── RIGHT — WhatsApp CTA ── */}
{/* ── RIGHT — Form + WhatsApp ── */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
  className="h-full"
>
  <div
    className="rounded-2xl p-7 md:p-10 h-full"
    style={{
      background: "white",
      border: "1px solid #ede0f7",
      boxShadow: "0 4px 24px rgba(58,15,69,0.07)",
    }}
  >
    <div className="mb-7">
      <h3
        className="text-[#3a0f45]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 700 }}
      >
        Send a Message
      </h3>
      <div className="flex items-center gap-2 mt-2 mb-3">
        <div className="h-[2px] w-8 rounded" style={{ background: "#C9A84C" }} />
        <div className="h-[2px] w-2 rounded" style={{ background: "#C9A84C", opacity: 0.4 }} />
      </div>
      <p className="text-gray-400 text-sm">
        Fill in your details and we'll connect on WhatsApp instantly.
      </p>
    </div>

    {sent ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-10 space-y-4"
      >
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full"
          style={{ background: "linear-gradient(135deg, #25D366, #1ebe5d)", color: "white" }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-[#3a0f45] font-semibold text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Redirected to WhatsApp!
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Continue the conversation on WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-xs font-medium px-5 py-2 rounded-full transition-colors"
          style={{ background: "#ede0f7", color: "#7B1F8A" }}
        >
          Send another message
        </button>
      </motion.div>
    ) : (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7B1F8A" }}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
            placeholder="Your full name"
            style={inputStyle("name")}
          />
        </div>

        <div>
        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7B1F8A" }}>Email <span className="text-gray-300 normal-case tracking-normal font-normal">(optional)</span></label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
            placeholder="your@email.com"
            style={inputStyle("email")}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7B1F8A" }}>Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused("")}
            placeholder="+91 XXXXX XXXXX"
            style={inputStyle("phone")}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7B1F8A" }}>Message</label>
       <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused("")}
            placeholder="Tell us about your enquiry..."
            rows={4}
            maxLength={500}
            style={inputStyle("message")}
          />
          <p className="text-right text-[11px] mt-1" style={{ color: form.message.length >= 500 ? "#ef4444" : "#b8a8c8" }}>
            {form.message.length}/500
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWhatsApp}
         disabled={loading || !form.name.trim() || !form.phone.trim() || !form.message.trim()}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading ? "#82c99a" : "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
            boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          }}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </>
          )}
        </motion.button>

        <p className="text-center text-[11px] text-gray-300 pt-1">
          Protected by reCAPTCHA · We never share your data
        </p>
      </div>
    )}
    
  </div>
</motion.div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}