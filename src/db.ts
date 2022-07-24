import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_HOST,
  NODE_ENV,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
});

client.on("error", (error: Error) => {
  console.error(error.message);
});

export default client;
