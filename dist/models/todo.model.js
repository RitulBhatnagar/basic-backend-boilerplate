"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const todoSchema = new mongoose_1.default.Schema({
    id: { type: String, default: (0, uuid_1.v4)() },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dateOfCreation: { type: Date, default: Date.now },
    dateOfCompletion: { type: Date },
    imageLink: { type: String },
});
exports.todoModel = mongoose_1.default.model("todo", todoSchema);
