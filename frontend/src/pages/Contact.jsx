import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="space-y-20 overflow-hidden">
   {/* HERO */}
<section
  className="relative text-white py-16 md:py-20 px-6 bg-cover bg-center"
  style={{ backgroundImage: `url(${heroImg})` }}
>
  <div className="absolute inset-0 bg-black/40"></div>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative max-w-6xl mx-auto text-center space-y-4"
  >
    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Contact Us</h1>
    <p className="text-lg md:text-xl opacity-90">
      Reach out to Flowtec for inquiries, support, or business collaborations
    </p>
  </motion.div>
</section>


        {/* CONTACT GRID */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div whileHover={{ scale: 1.02 }} className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Flowtec Location"
              src="https://www.google.com/maps?q=Delhi,India&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-lg p-10 space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Get in Touch</h2>
            <p className="text-gray-600">We’d love to hear from you! Reach out for product inquiries, partnerships, or support.</p>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">
                  Flowtec Industries<br />
                  123 Waterway Street,<br />
                  City, Country
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">info@flowtec.com</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">Business Hours<br />Mon – Sat : 9:30 AM – 6:30 PM</p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
