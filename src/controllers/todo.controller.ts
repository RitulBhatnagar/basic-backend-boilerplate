import { Request, Response } from "express";
import { todoModel } from "../models/todo.model";
import logger from "../logger";

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Missing body" });
  }

  try {
    const createTodo = new todoModel({
      title: title,
    });
    await createTodo.save();
    return res.status(200).json(createTodo);
  } catch (error) {
    logger.error("Error while creating the todo", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getItem = await todoModel.findOne({ id: id });
    if (!getItem) {
      return res.status(404).json({ message: "Item not founded" });
    }
    return res.status(200).json(getItem);
  } catch (error) {
    logger.error("Error while finding the todo", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, dateOfCreation, dateOfCompletion } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Missing body" });
  }
  if (!id) {
    return res.status(400).json({ message: "Missing params" });
  }
  try {
    const getItem = await todoModel.findOne({ id: id });
    if (!getItem) {
      return res.status(404).json({ message: "Item not founded" });
    }
    const data = { title, dateOfCreation, dateOfCompletion };
    const updateItem = await todoModel.findOneAndUpdate({ id: id }, data);
    return res.status(200).json(updateItem);
  } catch (error) {
    logger.error("Error while updating the todo", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const updateTodoCompletionState = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  if (!title || !completed) {
    return res.status(400).json({ message: "Missing body" });
  }
  if (!id) {
    return res.status(400).json({ message: "Missing params" });
  }
  try {
    const getItem = await todoModel.findOne({ id: id });
    if (!getItem) {
      return res.status(404).json({ message: "Item not founded" });
    }
    const data = { title, completed };
    const updateItem = await todoModel.findOneAndUpdate({ id: id }, data);
    return res.status(200).json(updateItem);
  } catch (error) {
    logger.error("Error while updating the todo completion state", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getItem = await todoModel.findOne({ id: id });
    if (!getItem) {
      return res.status(404).json({ message: "Item not founded" });
    }
    const deleteTodo = await todoModel.deleteOne({ id: id });
    return res.status(200).json({ message: "Todo is deleted" });
  } catch (error) {
    logger.error("Error while deleting the todo", error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const { completedStatus, createdBy, dateOfCreation } = req.body;
  try {
    if (completedStatus === true) {
    }
    const numberofTodosCompleted = await todoModel
      .find({ completed: true })
      .countDocuments();
    const numberofTodosNotCompleted = await todoModel
      .find({ completed: false })
      .countDocuments();
    if (dateOfCreation == true) {
      const sortDateofCreation = await todoModel.find({
        $sort: { dateOfCreation: true },
      });
    }
    const sortDateofCompletion = await todoModel.find({
      $sort: { dateOfCompletion: true },
    });
  } catch (error) {}
};
