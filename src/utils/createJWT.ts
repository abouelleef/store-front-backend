import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.type";

export const createJWT = (user: User) => {
  return jwt.sign({ user }, process.env.JWT_SECRET as string);
};
