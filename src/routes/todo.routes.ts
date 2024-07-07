import express from "express";
import { createTodo, getTodo } from "../controllers/todo.controller";

const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos/:id", getTodo);
export default router;
