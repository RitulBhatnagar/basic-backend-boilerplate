import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const todoSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateOfCreation: { type: Date, default: Date.now },
  dateOfCompletion: { type: Date },
  imageLink: { type: String },
});

export const todoModel = mongoose.model("todo", todoSchema);
