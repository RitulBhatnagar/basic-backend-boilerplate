"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.deleteTodo = exports.updateTodoCompletionState = exports.updateTodo = exports.getTodo = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo.model");
const logger_1 = __importDefault(require("../logger"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Missing body" });
    }
    try {
        const createTodo = new todo_model_1.todoModel({
            title: title,
        });
        yield createTodo.save();
        return res.status(200).json(createTodo);
    }
    catch (error) {
        logger_1.default.error("Error while creating the todo", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTodo = createTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getItem = yield todo_model_1.todoModel.findOne({ id: id });
        if (!getItem) {
            return res.status(404).json({ message: "Item not founded" });
        }
        return res.status(200).json(getItem);
    }
    catch (error) {
        logger_1.default.error("Error while finding the todo", error);
        return res.status(500).json({ message: "Internal server error " });
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, dateOfCreation, dateOfCompletion } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Missing body" });
    }
    if (!id) {
        return res.status(400).json({ message: "Missing params" });
    }
    try {
        const getItem = yield todo_model_1.todoModel.findOne({ id: id });
        if (!getItem) {
            return res.status(404).json({ message: "Item not founded" });
        }
        const data = { title, dateOfCreation, dateOfCompletion };
        const updateItem = yield todo_model_1.todoModel.findOneAndUpdate({ id: id }, data);
        return res.status(200).json(updateItem);
    }
    catch (error) {
        logger_1.default.error("Error while updating the todo", error);
        return res.status(500).json({ message: "Internal server error " });
    }
});
exports.updateTodo = updateTodo;
const updateTodoCompletionState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, completed } = req.body;
    if (!title || !completed) {
        return res.status(400).json({ message: "Missing body" });
    }
    if (!id) {
        return res.status(400).json({ message: "Missing params" });
    }
    try {
        const getItem = yield todo_model_1.todoModel.findOne({ id: id });
        if (!getItem) {
            return res.status(404).json({ message: "Item not founded" });
        }
        const data = { title, completed };
        const updateItem = yield todo_model_1.todoModel.findOneAndUpdate({ id: id }, data);
        return res.status(200).json(updateItem);
    }
    catch (error) {
        logger_1.default.error("Error while updating the todo completion state", error);
        return res.status(500).json({ message: "Internal server error " });
    }
});
exports.updateTodoCompletionState = updateTodoCompletionState;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getItem = yield todo_model_1.todoModel.findOne({ id: id });
        if (!getItem) {
            return res.status(404).json({ message: "Item not founded" });
        }
        const deleteTodo = yield todo_model_1.todoModel.deleteOne({ id: id });
        return res.status(200).json({ message: "Todo is deleted" });
    }
    catch (error) {
        logger_1.default.error("Error while deleting the todo", error);
        return res.status(500).json({ message: "Internal server error " });
    }
});
exports.deleteTodo = deleteTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { completedStatus, createdBy, dateOfCreation } = req.body;
    try {
        if (completedStatus === true) {
        }
        const numberofTodosCompleted = yield todo_model_1.todoModel
            .find({ completed: true })
            .countDocuments();
        const numberofTodosNotCompleted = yield todo_model_1.todoModel
            .find({ completed: false })
            .countDocuments();
        if (dateOfCreation == true) {
            const sortDateofCreation = yield todo_model_1.todoModel.find({
                $sort: { dateOfCreation: true },
            });
        }
        const sortDateofCompletion = yield todo_model_1.todoModel.find({
            $sort: { dateOfCompletion: true },
        });
    }
    catch (error) { }
});
exports.getTodos = getTodos;
