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
exports.jwtMiddleware = void 0;
const jwtService_1 = require("./jwtService");
const codeMessage_1 = require("../../models/codeMessage");
const path_1 = __importDefault(require("path"));
function jwtMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            if (!req.headers.cookie) {
                throw new Error();
            }
            const cookieData = req.headers.cookie; //извлекаю токен вида "Bearer <тут токен>"
            const tokenData = cookieData
                .split(";")
                .find(e => e.trim().startsWith("token="));
            const bearerToken = tokenData ? tokenData.split("=")[1] : null;
            const token = bearerToken ? bearerToken.split(" ")[1] : null;
            if (!token) {
                throw new Error();
            }
            const findUser = yield jwtService_1.jwtService.getUserByToken(token);
            if (!findUser) {
                throw new Error(`пользователь не найден по токену ${token}`);
            }
            req.user = findUser;
            next();
        }
        catch (error) {
            return res.status(codeMessage_1.codeMessage.Unauthorized).render(path_1.default.join(__dirname, "../../../src/ejsPages/errorPage"), { error: codeMessage_1.codeMessage.Unauthorized,
                message: `Эта страница доступна толлько авторизованным пользователям)` });
        }
    });
}
exports.jwtMiddleware = jwtMiddleware;
