"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const getTestRouter = () => {
    const router = express_1.default.Router();
    router.delete("/", (req, res) => {
        db_1.db.forms = [];
        res.sendStatus(200);
    });
    return router;
};
exports.getTestRouter = getTestRouter;
