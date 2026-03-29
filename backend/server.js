import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongooseConnection from "./mongo.js";
import appRoutes from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

// ✅ CORS first
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ DB Connection
mongooseConnection();

// ✅ Serve uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ Health Check
app.get("/health", (req, res) => {
  return res.status(200).json({ msg: "Server is up and running" });
});

// ✅ Routes
app.use("/api", appRoutes);

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});