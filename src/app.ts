import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import helmet from "helmet";
import router from "./routes";

dotenv.config();
const port = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(helmet.xssFilter()); // XSS-Protection
app.use(morgan("dev"));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
