import express from "express";
import axios from "axios";
import rateLimit from "express-rate-limit";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many requests. Please try again later." },
});

router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message, token } = req.body;

  try {
    if (!name || !email || !message || !token) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const captcha = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
        timeout: 5000,
      }
    );

    if (!captcha.data.success || (captcha.data.score !== undefined && captcha.data.score < 0.5)) {
      return res.status(400).json({ message: "Security check failed" });
    }

    // Build WhatsApp URL
    const waMessage = `New Contact Enquiry\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const waUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    res.json({ success: true, waUrl });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;