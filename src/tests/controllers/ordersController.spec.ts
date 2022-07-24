import supertest from "supertest";
import app from "../../app";
import Order from "../../interfaces/order.type";
import Product from "../../interfaces/product.type";
import { User } from "../../interfaces/user.type";

const request = supertest(app);

describe("Orders controllers: ", () => {
  type UserWithToken = User & { token?: string };

  let user: UserWithToken = {
    first_name: "Ahemd",
    last_name: "Mahmoud",
    email: "test@test.com",
    password: "123123@Aa",
  };

  let data: Order;
  let product: Product;
  let order: Order;

  beforeAll(async () => {
    const userResponse = await request.post("/api/users").send(user);

    user = userResponse.body.data;

    data = {
      user_id: user.id!,
      status: false,
    };

    const productResponse = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${user.token}`)
      .send({
        name: "product",
        description: "Product to add ot order",
        price: 15,
      });

    product = productResponse.body.data;

    const orderResponse = await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${user.token}`)
      .send({
        user_id: user.id,
        status: false,
      });

    order = orderResponse.body.data;
  });

  afterAll(async () => {
    try {
      await request
        .delete(`/api/orders/${order.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      await request
        .delete(`/api/products/${product.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      await request
        .delete(`/api/users/${user.id}`)
        .set("Authorization", `Bearer ${user.token}`);
    } catch (error) {
      console.log(error, "🧨🧨");
    }
  });

  it("POST /orders : should return a order", async () => {
    const res = await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${user.token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(201);

    expect(res.body.message).toMatch("Order created successfully");

    data = res.body.data;
  });

  it("POST /orders : should fail if user_id is not sent", async () => {
    const data = {
      status: false,
    };
    const res = await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${user.token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("POST /orders : should fail if status is not sent", async () => {
    const data = {
      user_id: user.id,
    };
    const res = await request
      .post("/api/orders")
      .set("Authorization", `Bearer ${user.token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("GET /orders : should return all orders", async () => {
    const res = await request
      .get("/api/orders")
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Orders fetched successfully");
  });

  it("GET /orders/user/:id : should show a order", async () => {
    const res = await request
      .get(`/api/orders/user/${user.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch(
      `Orders by user ${user.id} fetched successfully`
    );
  });

  it("GET /orders/:id : should show a order", async () => {
    const res = await request
      .get(`/api/orders/${data.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Order fetched successfully");
  });

  it("PUT /orders/:id : should update a order", async () => {
    const newOrder = {
      ...data,
      status: true,
    };
    const res = await request
      .put(`/api/orders/${data.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send(newOrder);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Order updated successfully");

    expect(res.body.data.status).toBeTrue();
  });

  it("DELETE /orders/:id : should delete a order", async () => {
    const res = await request
      .delete(`/api/orders/${data.id}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Order deleted successfully");
  });

  it("POST /orders/:id/products : should add product to an order", async () => {
    const res = await request
      .post(`/api/orders/${order.id}/products`)
      .set("Authorization", `Bearer ${user.token}`)
      .send({
        quantity: 2,
        product_id: product.id,
      });

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(201);

    expect(res.body.message).toMatch(
      `Product ${product.id} Added to order ${order.id} successfully`
    );
  });

  it("POST /orders/:id/products/:product_id : should remove product from an order", async () => {
    const res = await request
      .delete(`/api/orders/${order.id}/products/${product.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(200);

    expect(res.body.message).toMatch(
      `Product ${product.id} removed from order ${order.id} successfully`
    );
  });
});
