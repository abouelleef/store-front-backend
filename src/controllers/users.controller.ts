import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model";
import { createJWT } from "../utils/createJWT";

const userModel = new UserModel();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getAll();
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    const token = createJWT(user);

    res.status(StatusCodes.CREATED).json({
      status: "Success",
      message: "User created successfully",
      data: { ...user, token },
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.update(req.body, req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.delete(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.auth(email, password);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Error",
        message: "Login failed: email or password is not correct",
      });
    }

    const token = createJWT(user);

    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "User authenticated successfully",
      data: { ...user, token },
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
