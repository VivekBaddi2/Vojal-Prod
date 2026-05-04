import expressRouter from "express";
import productRouter from "./productRoutes.js";
import adminRouter from "./userRoutes.js";
import galleryRouter from "./galleryRoutes.js";
import captchaRouter from "./captchaRoutes.js";
import contactRoutes from "./contactRoutes.js";
import catalogueRouter from "./catalogueRoutes.js";
import categoryRouter from "./categoryRoutes.js";
const router = expressRouter();

router.use("/product",productRouter);
router.use("/admin", adminRouter);
router.use("/gallery",galleryRouter);
router.use("/captcha", captchaRouter);
router.use("/contact", contactRoutes);
router.use("/catalogue", catalogueRouter);
router.use("/category",catalogueRouter);

export default router;