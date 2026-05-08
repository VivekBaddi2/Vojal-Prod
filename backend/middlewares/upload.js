import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";


// 1. Configure Cloudinary (Add these to your Render Env Variables!)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup the Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file type
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "vojal_uploads",
      format: isPdf ? "pdf" : undefined, // Cloudinary handles image formats automatically
      resource_type: isPdf ? "raw" : "image", // PDFs MUST be 'raw' or 'auto'
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

// 3. Keep your existing File Filter logic
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false);
  }
};

// 4. Create the middleware with your existing limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;