import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.type";

const SECRET_KEY = process.env.JWT_SECRET!;

interface CustomRequest extends Request {
  user?: User;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // Check if the request has authorization header and it begins with "Bearer"
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED);
    return next(
      new Error("You are not logged in! Please log in to get access.")
    );
  }

  // Verify JWT

  const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
  // console.log(decoded);

  req.user = decoded.user;

  next();
};
