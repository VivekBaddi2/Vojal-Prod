import express from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const router = express.Router();

// ✅ limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
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

    // Some reCAPTCHA versions don't return a score, check success first
    if (!captcha.data.success || (captcha.data.score !== undefined && captcha.data.score < 0.5)) {
      return res.status(400).json({ message: "Security check failed" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text fallback
      html: `
        <h3>New Contact Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.json({ success: true });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;