"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const logger_1 = __importDefault(require("./logger"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json({ limit: "10mb" }));
(0, db_1.connectDb)();
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/api", todo_routes_1.default);
app.listen(port, () => {
    logger_1.default.info(`Server is running on port ${port}`);
});
