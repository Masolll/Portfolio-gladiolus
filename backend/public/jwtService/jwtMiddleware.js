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
const path_1 = __importDefault(require("path"));
function jwtMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            if (!req.headers.authorization) {
                return res.render(path_1.default.join(__dirname, "../../ejs-pages/errorPage"), { error: "401",
                    message: "Эта страница доступна только авторизованным пользователям :)" });
            }
            const token = req.headers.authorization.split(" ")[1]; //извлекаю токен вида "Bearer <тут токен>"
            const findUser = yield jwtService_1.jwtService.getUserByToken(token);
            if (!findUser) {
                return res.render(path_1.default.join(__dirname, "../../ejs-pages/errorPage"), { error: "401",
                    message: "Эта страница доступна только авторизованным пользователям :)" });
            }
            req.user = findUser;
            next();
        }
        catch (error) {
            return res.render(path_1.default.join(__dirname, "../../ejs-pages/errorPage"), { error: "401",
                message: "Эта страница доступна только авторизованным пользователям :)" });
        }
    });
}
exports.jwtMiddleware = jwtMiddleware;
