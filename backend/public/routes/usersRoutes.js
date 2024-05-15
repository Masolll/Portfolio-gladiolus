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
exports.getUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const codeMessage_1 = require("../models/codeMessage");
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const getUsersRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.query.name) {
            let user = yield MongoDbUsersRepository_1.UsersRepository.findUserByName(req.query.name);
            return user
                ? res.json([user])
                : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
        }
        else {
            let users = yield MongoDbUsersRepository_1.UsersRepository.findAllUsers();
            res.json(users);
        }
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let findForm = yield MongoDbUsersRepository_1.UsersRepository.findUserById(+req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage_1.codeMessage.NotFound);
    }));
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield MongoDbUsersRepository_1.UsersRepository.creatureUser(req.body);
        return res.sendStatus(codeMessage_1.codeMessage.NoContent);
    }));
    router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isUpdate = yield MongoDbUsersRepository_1.UsersRepository.updateUser(+req.params.id, req.body);
        return isUpdate ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isDeleted = yield MongoDbUsersRepository_1.UsersRepository.deleteAllUsers();
        return isDeleted ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isDeleted = yield MongoDbUsersRepository_1.UsersRepository.deleteUserById(+req.params.id);
        return isDeleted ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    return router;
};
exports.getUsersRouter = getUsersRouter;
