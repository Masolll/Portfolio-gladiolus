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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const jwtService_1 = require("./jwtService");
const codeMessage_1 = require("../models/codeMessage");
function jwtMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            if (!req.headers.authorization) {
                return res.status(codeMessage_1.codeMessage.Unauthorized).json({ error: 'Не авторизован' });
            }
            const token = req.headers.authorization.split(" ")[1]; //извлекаю токен вида "Bearer <тут токен>"
            const findUser = yield jwtService_1.jwtService.getUserByToken(token);
            if (!findUser) {
                return res.status(codeMessage_1.codeMessage.Unauthorized).json({ error: 'Не авторизован' });
            }
            req.user = findUser;
            next();
        }
        catch (error) {
            return res.status(codeMessage_1.codeMessage.Unauthorized).json({ error: 'Не авторизован' });
        }
    });
}
exports.jwtMiddleware = jwtMiddleware;
