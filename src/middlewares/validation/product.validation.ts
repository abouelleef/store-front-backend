import { body } from "express-validator";
import { validator } from "./validator";

export const productValidation = [
  body("name").isString().withMessage("product name must be provided"),

  body("description").isString().withMessage("description can not be empty"),

  body("price").isNumeric().withMessage("price must be greater than 0"),

  validator,
];
