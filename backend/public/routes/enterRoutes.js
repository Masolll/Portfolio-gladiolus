"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getEnterRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const express_validator_1 = require("express-validator");
const bcrypt = __importStar(require("bcrypt"));
const jwtService_1 = require("../businessLayer/jwtService/jwtService");
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const getEnterRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/enter.html"));
    });
    router.post('/', (0, express_validator_1.body)('email').notEmpty(), (0, express_validator_1.body)('password').notEmpty(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(codeMessage_1.codeMessage.BadRequest).send('Не пройдена валидация');
        }
        const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserByEmail(req.body.email);
        if (!findUser) {
            return res.status(codeMessage_1.codeMessage.BadRequest).send('Пользователь с таким email не найден');
        }
        const validPassword = bcrypt.compareSync(req.body.password, findUser.password);
        if (!validPassword) {
            return res.status(codeMessage_1.codeMessage.BadRequest).send('Введен неверный пароль');
        }
        const token = yield jwtService_1.jwtService.createJWT(findUser);
        return res.json({ token: token });
    }));
    router.get('/confirmEmail', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        if (req.user) {
            res.sendFile(path_1.default.join(__dirname, "../../../portfolio/enterConfirmEmail.html"));
        }
        else {
            return res.status(codeMessage_1.codeMessage.Unauthorized).render(path_1.default.join(__dirname, "../../src/ejsPages/errorPage"), { error: codeMessage_1.codeMessage.Unauthorized,
                message: `Эта страница доступна толлько авторизованным пользователям)` });
        }
    });
    return router;
};
exports.getEnterRouter = getEnterRouter;
