import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getAll();
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.getById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    res.status(StatusCodes.CREATED).json({
      status: "Success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.update(req.body, req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.delete(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
