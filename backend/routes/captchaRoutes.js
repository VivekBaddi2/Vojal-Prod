import express from "express";
import axios from "axios";
import rateLimit from "express-rate-limit";

const router = express.Router();

// ✅ limiter
const captchaLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many captcha requests. Try later.",
  },
});

router.post("/verify", captchaLimiter, async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token required" });
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

  const { success, score, action } = response.data;

if (!success || score < 0.7 || action !== "enquire") {
  return res.status(400).json({
    success: false,
    message: "Bot detected",
  });
}

    if (success && score >= 0.7){
      return res.json({ success: true, score });
    } else {
      return res.status(400).json({
        success: false,
        message: "Bot detected",
        score,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

export default router;