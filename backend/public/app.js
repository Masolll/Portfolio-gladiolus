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
const codeMessage_1 = require("./models/codeMessage");
const nodemailerRouter_1 = require("./routes/nodemailerRouter");
const displayPortfolioRoutes_1 = require("./routes/displayPortfolioRoutes");
exports.app = (0, express_1.default)();
exports.bodyMiddleWare = express_1.default.json();
exports.app.use(exports.bodyMiddleWare);
exports.app.set('view engine', 'ejs');
exports.app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        return res
            .status(codeMessage_1.codeMessage.NotFound)
            .render(path_1.default.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
            error: codeMessage_1.codeMessage.NotFound,
            message: "Страница не найдена :("
        });
    }
    next();
});
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "/../../portfolio")));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../uploads')));
exports.app.use('/', (0, mainRoutes_1.getMainRouter)());
exports.app.use('/registration', (0, registrationRoutes_1.getRegistrationRouter)());
exports.app.use('/portfolio', (0, portfolioRouter_1.getPortfolioRouter)());
exports.app.use('/enter', (0, enterRoutes_1.getEnterRouter)());
exports.app.use('/allForms', (0, allFormsRouter_1.getAllFormsRouter)());
exports.app.use('/users', (0, usersRoutes_1.getUsersRouter)());
exports.app.use('/email', (0, nodemailerRouter_1.getNodemailerRouter)());
exports.app.use('/display', (0, displayPortfolioRoutes_1.getDisplayPortfolioRouter)());
exports.app.use((req, res) => {
    return res
        .status(codeMessage_1.codeMessage.NotFound)
        .render(path_1.default.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
        error: codeMessage_1.codeMessage.NotFound,
        message: "Страница не найдена :("
    });
});
