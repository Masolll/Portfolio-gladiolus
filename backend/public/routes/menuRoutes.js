"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../jwtService/jwtMiddleware");
const express_validator_1 = require("express-validator");
const codeMessage_1 = require("../models/codeMessage");
const getMenuRouter = () => {
    const router = express_1.default.Router();
    router.get('/', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            res.status(codeMessage_1.codeMessage.Unauthorized).send('Пользователь не авторизован');
        }
        // res.sendFile(path.join(__dirname, "../../../portfolio/menu.html"))
        res.send(req.user);
    });
    return router;
};
exports.getMenuRouter = getMenuRouter;
