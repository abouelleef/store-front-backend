import OrderModel from "../../models/order.model";
import UserModel from "../../models/user.model";
import { User } from "../../interfaces/user.type";

const orderModel = new OrderModel();
const userModel = new UserModel();

describe("Order Model", () => {
  let user: User;

  beforeAll(async () => {
    user = await userModel.create({
      first_name: "Ahemd",
      last_name: "Mahmoud",
      email: "testOrder@test.com",
      password: "123123@Aa",
    });
  });

  it("should create a order", async () => {
    const order = await orderModel.create({
      user_id: user.id!,
      status: false,
    });
    expect(order.status).toEqual(false);
  });

  it("should update a order", async () => {
    const orders = await orderModel.getAll();

    const order_id = orders[0].id;
    const user_id = orders[0].user_id;

    const order = await orderModel.update(
      {
        user_id,
        status: true,
      },
      order_id as string
    );
    expect(order.status).toEqual(true);
  });

  it("should return all orders", async () => {
    const orders = await orderModel.getAll();
    expect(orders.length).toEqual(1);
  });

  it("should return order by id", async () => {
    const orders = await orderModel.getAll();
    const order_id = orders[0].id as string;

    const result = await orderModel.getById(order_id);
    expect(result.id).toEqual(order_id);
  });

  it("should delete the order", async () => {
    let orders = await orderModel.getAll();
    const order_id = orders[0].id as string;

    await orderModel.delete(order_id);
    orders = await orderModel.getAll();

    expect(orders.length).toEqual(0);
  });

  afterAll(async () => {
    await userModel.delete(user.id!);
  });
});
