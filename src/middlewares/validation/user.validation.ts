import { body } from "express-validator";
import { validator } from "./validator";

export const userValidation = [
  body("first_name")
    .isAlpha()
    .withMessage("first_name can not contian numbers or special characters"),

  body("last_name")
    .isAlpha()
    .withMessage("last_name can not contian numbers or special characters"),

  body("email").isEmail().withMessage("email is not valid"),

  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least one number, one special character, small, and capital letters"
    ),

  validator,
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("password can not be empty"),
  validator,
];
