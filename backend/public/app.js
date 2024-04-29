"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMiddleWare = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const formRoutes_1 = require("./routes/formRoutes");
const testRoutes_1 = require("./routes/testRoutes");
const mainRoutes_1 = require("./routes/mainRoutes");
exports.app = (0, express_1.default)();
//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
exports.bodyMiddleWare = express_1.default.json();
exports.app.use(exports.bodyMiddleWare);
exports.app.use('/', (0, mainRoutes_1.getMainRouter)());
exports.app.use('/form', (0, formRoutes_1.getFormRouter)());
exports.app.use('/test', (0, testRoutes_1.getTestRouter)());
