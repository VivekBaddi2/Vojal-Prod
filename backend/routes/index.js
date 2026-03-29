import expressRouter from "express";
import productRouter from "./productRoutes.js";
import adminRouter from "./userRoutes.js";
import galleryRouter from "./galleryRoutes.js";
import captchaRouter from "./captchaRoutes.js";

const router = expressRouter();

router.use("/product",productRouter);
router.use("/admin", adminRouter);
router.use("/gallery",galleryRouter);
router.use("/captcha", captchaRouter);

export default router;