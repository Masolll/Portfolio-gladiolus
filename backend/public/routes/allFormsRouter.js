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
exports.getAllFormsRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const getAllFormsRouter = () => {
    const router = express_1.default.Router();
    router.get('/', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (Object.keys(req.query).length > 0) {
            let users = yield MongoDbUsersRepository_1.UsersRepository.findUsersByQueryParams(req.query);
            return users
                ? res.render(path_1.default.join(__dirname, "../../src/ejsPages/allForms.ejs"), {
                    users: users,
                    user: req.user
                })
                : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
        }
        else {
            let users = yield MongoDbUsersRepository_1.UsersRepository.findAllUsers();
            res.render(path_1.default.join(__dirname, "../../src/ejsPages/allForms.ejs"), {
                users: users,
                user: req.user
            });
        }
        //передаю req.user в ejs для того чтобы на странице либо сгенерировать кнопку регистрации либо кнопку для перехода в профиль
    }));
    return router;
};
exports.getAllFormsRouter = getAllFormsRouter;
