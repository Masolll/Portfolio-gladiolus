"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodemailerRouter = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = require("../businessLayer/emailService/nodemailer");
const codeMessage_1 = require("../models/codeMessage");
const getNodemailerRouter = () => {
    const router = express_1.default.Router();
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const enterPassword = Math.trunc(Math.random() * 10 ** 6);
        yield (0, nodemailer_1.sendMessage)(req.body.email, enterPassword);
        return res.status(codeMessage_1.codeMessage.OK).json(enterPassword);
    }));
    return router;
};
exports.getNodemailerRouter = getNodemailerRouter;
