import { Request, Response, NextFunction } from "express";

const notFoundMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({ message: "Not found" });
  next();
};

export default notFoundMiddleware;
