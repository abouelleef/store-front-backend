import supertest from "supertest";
import app from "../../app";
import { createJWT } from "../../utils/createJWT";

const request = supertest(app);

describe("Products controllers: ", () => {
  const token = createJWT({
    first_name: "Ahemd",
    last_name: "Mahmoud",
    email: "test@test.com",
    password: "123123@Aa",
  });

  let product: {
    id: string;
    name: string;
    description: string;
    price: string;
  };

  const data = {
    name: "product",
    description: "Very Cool product",
    price: 15,
  };

  it("POST /products : should return a product", async () => {
    const res = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(201);

    expect(res.body.message).toMatch("Product created successfully");

    product = res.body.data;
  });

  it("POST /products : should fail if price is not sent", async () => {
    const data = {
      name: "product",
      description: "Very Cool product",
    };
    const res = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("POST /products : should fail if name is not sent", async () => {
    const data = {
      description: "Very Cool product",
      price: 15,
    };
    const res = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("GET /products : should return all products", async () => {
    const res = await request.get("/api/products");

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Products fetched successfully");
  });

  it("GET /products/:id : should show a product", async () => {
    const res = await request.get(`/api/products/${product.id}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Product fetched successfully");
  });

  it("PUT /products/:id : should update a product", async () => {
    const newProduct = {
      ...data,
      name: "updated product",
    };
    const res = await request
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Product updated successfully");

    expect(res.body.data.name).toMatch("updated product");
  });

  it("DELETE /products/:id : should delete a product", async () => {
    const res = await request
      .delete(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Product deleted successfully");
  });
});
