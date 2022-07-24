import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { param, validationResult } from "express-validator";

export const validator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const message = result
      .array()
      .reduce((current, error) => current + error.msg + " ", "");
    const error = new Error(message);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY);

    throw error;
  } else next();
};

export const idValidation = [
  param("id").isUUID().withMessage("ID in not valid must br uuid"),
  validator,
];
