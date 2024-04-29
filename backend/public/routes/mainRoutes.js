"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const getMainRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        const filePath = path_1.default.join(__dirname, "../../src/index.html");
        console.log(__dirname);
        res.sendFile(filePath);
    });
    return router;
};
exports.getMainRouter = getMainRouter;
