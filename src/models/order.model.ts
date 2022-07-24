import client from "../db";
import Order from "../interfaces/order.type";

class OrderModel {
  // Get all
  async getAll(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders`;

      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Get by id
  async getById(id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders where id=$1`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Create
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `
          INSERT INTO orders 
          (user_id, status)
          values ($1, $2) 
          RETURNING *
          `;

      const result = await connection.query(sql, [order.user_id, order.status]);

      connection.release();

      // return created order
      return result.rows[0];
    } catch (error) {
      throw new Error(`Order creation failed: ${(error as Error).message}`);
    }
  }

  // Delete
  async delete(id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM orders 
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
  async update(order: Order, id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `
          UPDATE orders SET 
          user_id=$1, 
          status=$2
          WHERE id=$3
          RETURNING *
          `;

      const result = await connection.query(sql, [
        order.user_id,
        order.status,
        id,
      ]);

      connection.release();

      // return updated order
      return result.rows[0];
    } catch (error) {
      throw new Error(`Order update failed: ${(error as Error).message}`);
    }
  }

  // Add product to order
  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `
        INSERT INTO order_products
        (quantity, order_id, product_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `;

      const result = await connection.query(sql, [
        quantity,
        order_id,
        product_id,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add product ${product_id} 
      to order ${order_id}: ${(error as Error).message}`);
    }
  }

  // Remove product from order
  async removeProduct(order_id: string, product_id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `
        DELETE FROM order_products
        WHERE order_id = ($1) AND product_id = ($2)
        RETURNING *
        `;

      const result = await connection.query(sql, [order_id, product_id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not remove product ${product_id} 
      from order ${order_id}: ${(error as Error).message}`);
    }
  }

  // Get Order by user_id
  async getByUserId(user_id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders where user_id=$1`;

      const result = await connection.query(sql, [user_id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could get orders for user ${user_id}: ${(error as Error).message}`
      );
    }
  }
}

export default OrderModel;
