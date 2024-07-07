import mongoose from "mongoose";
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    logger.info("Connected to db ✅");
  } catch (error) {
    logger.error("Error in db connection", error);
    process.exit(1);
  }
};
