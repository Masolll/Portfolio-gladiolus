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
exports.getRegistrationRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const express_validator_1 = require("express-validator");
const getRegistrationRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/registration.html"));
    });
    // @ts-ignore
    router.post('/', (0, express_validator_1.body)('name').trim().notEmpty(), (0, express_validator_1.body)('email').trim().notEmpty().isEmail(), (0, express_validator_1.body)('password').trim().notEmpty().withMessage('Error! Пароль не может быть пустым'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(codeMessage_1.codeMessage.BadRequest).send('Не пройдена валидация');
        }
        let candidat = yield MongoDbUsersRepository_1.UsersRepository.findUserByEmail(req.body.email);
        if (candidat) {
            return res.status(codeMessage_1.codeMessage.BadRequest).send('Пользователь с таким email уже существует');
        }
        yield MongoDbUsersRepository_1.UsersRepository.creatureUser(req.body);
        return res.sendStatus(codeMessage_1.codeMessage.NoContent);
    }));
    router.get('/confirmEmail', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/registrationConfirmEmail.html"));
    });
    return router;
};
exports.getRegistrationRouter = getRegistrationRouter;
