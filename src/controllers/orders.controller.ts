import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getAll();
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.getById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.create(req.body);
    res.status(StatusCodes.CREATED).json({
      status: "Success",
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.update(req.body, req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.delete(req.params.id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order_id = req.params.id;
  const { quantity, product_id } = req.body;
  try {
    const order = await orderModel.addProduct(quantity, order_id, product_id);
    res.status(StatusCodes.CREATED).json({
      status: "Success",
      message: `Product ${product_id} Added to order ${order_id} successfully`,
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order_id = req.params.id;
  const product_id = req.params.product_id;
  try {
    const order = await orderModel.removeProduct(order_id, product_id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: `Product ${product_id} removed from order ${order_id} successfully`,
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.params.id;
  try {
    const order = await orderModel.getByUserId(user_id);
    res.status(StatusCodes.OK).json({
      status: "Success",
      message: `Orders by user ${user_id} fetched successfully`,
      data: order,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};
