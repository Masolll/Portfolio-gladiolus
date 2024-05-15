"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMiddleWare = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./routes/usersRoutes");
const mainRoutes_1 = require("./routes/mainRoutes");
const registrationRoutes_1 = require("./routes/registrationRoutes");
const enterRoutes_1 = require("./routes/enterRoutes");
const portfolioRouter_1 = require("./routes/portfolioRouter");
const allFormsRouter_1 = require("./routes/allFormsRouter");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
exports.bodyMiddleWare = express_1.default.json();
exports.app.use(exports.bodyMiddleWare);
//подключаю шаблонизатор ejs
exports.app.set('view engine', 'ejs');
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "/../../portfolio")));
//страницы доступные всем пользователям
exports.app.use('/', (0, mainRoutes_1.getMainRouter)());
exports.app.use('/registration', (0, registrationRoutes_1.getRegistrationRouter)());
exports.app.use('/portfolio', (0, portfolioRouter_1.getPortfolioRouter)());
exports.app.use('/enter', (0, enterRoutes_1.getEnterRouter)());
exports.app.use('/allForms', (0, allFormsRouter_1.getAllFormsRouter)());
exports.app.use('/users', (0, usersRoutes_1.getUsersRouter)());
//страницы доступные только авторизованным полльзователям
// app.use(jwtMiddleware);
