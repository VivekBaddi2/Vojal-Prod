import "./config/env.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import mongooseConnection from "./mongo.js";
import appRoutes from "./routes/index.js";

const port = process.env.PORT || 4000;
const app = express();



// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://vojal.in",
  "https://www.vojal.in",
  "https://vojal.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.set("trust proxy", 1);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// DB
mongooseConnection();

// Static uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Health
app.get("/health", (req, res) => {
  return res.status(200).json({ msg: "Server is up and running" });
});

// Routes
app.use("/api", appRoutes);

// Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});