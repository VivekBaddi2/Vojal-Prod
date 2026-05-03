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
    // ✅ Basic validation
    if (!name || !email || !message || !token) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Verify reCAPTCHA (with timeout)
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

    if (!captcha.data.success || captcha.data.score < 0.6) {
      return res.status(400).json({ message: "Bot detected" });
    }

    // ✅ Email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // ADD THIS LINE:
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // ✅ Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
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
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;