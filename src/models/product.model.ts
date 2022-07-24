import client from "../db";
import Product from "../interfaces/product.type";

class ProductModel {
  // Get all
  async getAll(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products`;

      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Get by id
  async getById(id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products where id=$1`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Create
  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO products 
          (name, description, price)
          values ($1, $2, $3) 
          RETURNING *`;

      const result = await connection.query(sql, [
        product.name,
        product.description,
        product.price,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Product (${product.name}) creation failed: ${(error as Error).message}`
      );
    }
  }

  // Delete
  async delete(id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM products 
          WHERE id=$1
          RETURNING *
          `;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Delete failed: ${(error as Error).message}`);
    }
  }

  // Update
  async update(product: Product, id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `UPDATE products SET 
          name=$1, 
          description=$2, 
          price=$3
          WHERE id=$4
          RETURNING *`;

      const result = await connection.query(sql, [
        product.name,
        product.description,
        product.price,
        id,
      ]);

      connection.release();

      // return updated product
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Product (${product.name}) update failed: ${(error as Error).message}`
      );
    }
  }
}

export default ProductModel;
