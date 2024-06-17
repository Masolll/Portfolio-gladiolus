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
            next();
            //передаю управление потому что на некоторых страницах нужно смотреть авторизован пользователь или нет
            //и на основании этого генерировать страницу либо с кнопкой "регистрация" либо с кнопкой ведущей в лк
            //поэтому здесь не стоит возвращать ошибку
        }
    });
}
exports.jwtMiddleware = jwtMiddleware;
