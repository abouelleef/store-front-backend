import { Router } from "express";
import orderRouter from "./orders.routes";
import productRouter from "./products.routes";
import userRouter from "./users.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);

export default router;
