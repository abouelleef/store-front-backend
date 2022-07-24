import ProductModel from "../../models/product.model";

const productModel = new ProductModel();

describe("Product Model", () => {
  it("should create a product", async () => {
    const product = await productModel.create({
      name: "product1",
      description: "Cool product",
      price: 12,
    });
    expect(product.name).toEqual("product1");
  });

  it("should update a product", async () => {
    const products = await productModel.getAll();

    const productId = products[0].id;

    const product = await productModel.update(
      {
        name: "product1",
        description: "Very Cool product",
        price: 12,
      },
      productId as string
    );
    expect(product.description).toEqual("Very Cool product");
  });

  it("should return all products", async () => {
    const products = await productModel.getAll();
    expect(products.length).toEqual(1);
  });

  it("should return product by id", async () => {
    const products = await productModel.getAll();
    const productId = products[0].id as string;

    const result = await productModel.getById(productId);
    expect(result.name).toEqual("product1");
  });

  it("should delete the product", async () => {
    let products = await productModel.getAll();
    const productId = products[0].id as string;

    await productModel.delete(productId);
    products = await productModel.getAll();

    expect(products.length).toEqual(0);
  });
});
