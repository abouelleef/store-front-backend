import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Users controllers: ", () => {
  let user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
  };

  const data = {
    first_name: "Ahemd",
    last_name: "Mahmoud",
    email: "test2@test.com",
    password: "123123@Aa",
  };

  it("POST /users : should return a user", async () => {
    const res = await request.post("/api/users").send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(201);

    expect(res.body.message).toMatch("User created successfully");
    expect(Object.keys(res.body.data)).toContain("token");
  });

  it("POST /users : should fail if required email is not sent", async () => {
    const data = {
      first_name: "Ahemd",
      last_name: "Mahmoud",
      password: "123123@Aa",
    };
    const res = await request.post("/api/users").send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("POST /users : should fail if required password is not sent", async () => {
    const data = {
      first_name: "Ahemd",
      last_name: "Mahmoud",
      email: "test@test.com",
    };
    const res = await request.post("/api/users").send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(422);
  });

  it("POST /users/login : should authenticate user", async () => {
    const res = await request.post("/api/users/login").send(data);

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(200);

    expect(res.body.message).toMatch("User authenticated successfully");
    expect(Object.keys(res.body.data)).toContain("token");

    user = res.body.data;
  });

  it("POST /users/login : should fail if wrong password or email provided", async () => {
    const res = await request
      .post("/api/users/login")
      .send({ ...data, password: "somerandompassword" });

    expect(res.headers["content-type"]).toMatch("application/json");

    expect(res.statusCode).toEqual(401);

    expect(res.body.status).toMatch("Error");
    expect(res.body.message).toMatch(
      "Login failed: email or password is not correct"
    );
  });

  it("GET /users : should return all users", async () => {
    const res = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("Users fetched successfully");
  });

  it("GET /users/:id : should show a user", async () => {
    const res = await request
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("User fetched successfully");
  });

  it("PUT /users/:id : should update a user", async () => {
    const newUser = {
      ...data,
      email: "updated@test.com",
    };
    const res = await request
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send(newUser);

    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("User updated successfully");

    expect(res.body.data.email).toMatch("updated@test.com");
  });

  it("DELETE /users/:id : should delete a user", async () => {
    const res = await request
      .delete(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch("User deleted successfully");
  });
});
