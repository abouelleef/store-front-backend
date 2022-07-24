import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller";
import { protect } from "../middlewares/protect.middleware";
import { productValidation } from "../middlewares/validation/product.validation";
import { idValidation } from "../middlewares/validation/validator";

const productRouter = Router();

productRouter
  .route("/")
  .post(protect, productValidation, createProduct)
  .get(getAllProducts);
productRouter
  .route("/:id")
  .get(idValidation, getProductById)
  .delete(protect, idValidation, deleteProduct)
  .put(protect, idValidation, productValidation, updateProduct);

export default productRouter;
