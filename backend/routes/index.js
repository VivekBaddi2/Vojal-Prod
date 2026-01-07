import expressRouter from "express";
import productRouter from "./productRoutes.js";
import adminRouter from "./userRoutes.js";

const router = expressRouter();

router.use("/product",productRouter);
router.use("/admin", adminRouter)

export default router;