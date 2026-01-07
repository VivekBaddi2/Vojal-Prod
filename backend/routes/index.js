import expressRouter from "express";
import productRouter from "./productRoutes.js";
import adminRouter from "./userRoutes.js";
import galleryRouter from "./galleryRoutes.js";

const router = expressRouter();

router.use("/product",productRouter);
router.use("/admin", adminRouter);
router.use("/gallery",galleryRouter);

export default router;