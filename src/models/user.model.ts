import client from "../db";
import { User } from "../interfaces/user.type";

import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  return bcrypt.hash(password, parseInt(process.env.SALT as string));
};

class UserModel {
  // Get all
  async getAll(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT id, email, first_name, last_name FROM users`;

      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Get by id
  async getById(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT id, email, first_name, last_name FROM users where id=$1`;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Read failed: ${(error as Error).message}`);
    }
  }

  // Create
  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO users 
          (first_name, last_name, email, password)
          values ($1, $2, $3, $4) 
          RETURNING id, first_name, last_name, email`;

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        await hashPassword(user.password),
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `User (${user.first_name} ${user.last_name}) creation failed: ${
          (error as Error).message
        }`
      );
    }
  }

  // Delete
  async delete(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM users 
          WHERE id=$1
          RETURNING id, first_name, last_name, email
          `;

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Delete failed: ${(error as Error).message}`);
    }
  }

  // Update
  async update(user: User, id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `
          UPDATE users SET 
          first_name=$1, 
          last_name=$2, 
          email=$3,
          password=$4
          WHERE id=$5
          RETURNING id, first_name, last_name, email
          `;

      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        await hashPassword(user.password),
        id,
      ]);

      connection.release();

      // return updated user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `User (${user.first_name} ${user.last_name}) update failed: ${
          (error as Error).message
        }`
      );
    }
  }

  // Authenticate
  async auth(email: string, password: string): Promise<User | null> {
    try {
      const connection = await client.connect();
      const sql = `
        SELECT password FROM users WHERE email=$1
      `;
      const result = await connection.query(sql, [email]);

      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0];

        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (isValidPassword) {
          const user = await connection.query(
            `
            SELECT id, first_name, last_name, email
            FROM users
            WHERE email=($1)
            `,
            [email]
          );
          return user.rows[0];
        }
      }

      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Login failed ${(error as Error).message}`);
    }
  }
}

export default UserModel;
