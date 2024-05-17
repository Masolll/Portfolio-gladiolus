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
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecretKey_1 = require("./jwtSecretKey");
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
exports.jwtService = {
    createJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                userEmail: user.email
            };
            return jsonwebtoken_1.default.sign(payload, jwtSecretKey_1.secretKey.jwtSecret, { expiresIn: "1y" });
            //токен активен 1 год
        });
    },
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedData = jsonwebtoken_1.default.verify(token, jwtSecretKey_1.secretKey.jwtSecret); //если verify не проходит то падает ошибка
                //в decodedData лежит payload, так как в payload я добавил только email то и здесь в объекте будет только email
                const email = decodedData.userEmail;
                const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserByEmail(email);
                return findUser ? findUser : null;
            }
            catch (error) {
                return null;
            }
        });
    }
};
