import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  addProduct,
  removeProduct,
  getOrderByUserId,
} from "../controllers/orders.controller";
import { protect } from "../middlewares/protect.middleware";
import {
  orderValidation,
  addProductValidation,
} from "../middlewares/validation/order.validation";
import { idValidation } from "../middlewares/validation/validator";

const orderRouter = Router();

orderRouter.use(protect);

orderRouter.route("/").get(getAllOrders).post(orderValidation, createOrder);

orderRouter
  .route("/:id")
  .get(idValidation, getOrderById)
  .delete(idValidation, deleteOrder)
  .put(idValidation, orderValidation, updateOrder);

orderRouter.post(
  "/:id/products",
  idValidation,
  addProductValidation,
  addProduct
);

orderRouter.delete("/:id/products/:product_id", idValidation, removeProduct);
orderRouter.get("/user/:id", idValidation, getOrderByUserId);

export default orderRouter;
