"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const getMainRouter = () => {
    const router = express_1.default.Router();
    router.get('/', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/index.ejs"), { user: req.user });
    });
    return router;
};
exports.getMainRouter = getMainRouter;
