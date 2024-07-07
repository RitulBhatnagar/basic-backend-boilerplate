import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes";
import logger from "./logger";
import { connectDb } from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: "10mb" }));

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api", todoRoutes);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
