import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { globalErrorHandler } from "./controllers/errorController.js";
import userRouter from "./routes/userRouter.js";
import waterRouter from "./routes/waterRouter.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utilities/swagger.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const pathPrefix = "/api";
app.use(`${pathPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`${pathPrefix}/users`, userRouter);
app.use(`${pathPrefix}/water`, waterRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = +process.env.PORT || 3000;

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
