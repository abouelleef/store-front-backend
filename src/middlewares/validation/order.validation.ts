import { body } from "express-validator";
import { validator } from "./validator";

export const orderValidation = [
  body("user_id").isUUID().withMessage("user_id must be a uuid"),

  body("status")
    .isBoolean()
    .withMessage("status can not be empty and must be boolean"),

  validator,
];

export const addProductValidation = [
  body("product_id").isUUID().withMessage("product_id must be a uuid"),

  body("quantity")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("status can not be empty and must be boolean"),

  validator,
];
