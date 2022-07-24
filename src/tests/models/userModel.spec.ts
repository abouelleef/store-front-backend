import UserModel from "../../models/user.model";

const userModel = new UserModel();

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await userModel.create({
      first_name: "Ahemd",
      last_name: "Mahmoud",
      email: "test1@test.com",
      password: "123123@Aa",
    });
    expect(user.email).toEqual("test1@test.com");
  });

  it("should update a user", async () => {
    const users = await userModel.getAll();

    const user_id = users[0].id;

    const user = await userModel.update(
      {
        first_name: "Ahemd",
        last_name: "Mahmoud",
        email: "test2@test.com",
        password: "123123@Aa",
      },
      user_id as string
    );
    expect(user.email).toEqual("test2@test.com");
  });

  it("should return all users", async () => {
    const users = await userModel.getAll();
    expect(users.length).toEqual(1);
  });

  it("should return user by id", async () => {
    const users = await userModel.getAll();
    const user_id = users[0].id as string;

    const result = await userModel.getById(user_id);
    expect(result.email).toEqual("test2@test.com");
  });

  it("should delete the user", async () => {
    let users = await userModel.getAll();
    const user_id = users[0].id as string;

    await userModel.delete(user_id);
    users = await userModel.getAll();

    expect(users.length).toEqual(0);
  });
});
