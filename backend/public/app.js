"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMiddleWare = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./routes/usersRoutes");
const mainRoutes_1 = require("./routes/mainRoutes");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
exports.bodyMiddleWare = express_1.default.json();
exports.app.use(exports.bodyMiddleWare);
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../../portfolio")));
exports.app.use('/', (0, mainRoutes_1.getMainRouter)());
exports.app.use('/users', (0, usersRoutes_1.getUsersRouter)());
