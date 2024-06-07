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
exports.getPortfolioRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const getPortfolioRouter = () => {
    const router = express_1.default.Router();
    router.get('/', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolio.html"));
    });
    router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isUpdate = yield MongoDbUsersRepository_1.UsersRepository.updateUser(+req.params.id, req.body);
        return isUpdate ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.get('/edit', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEdit.html"));
    });
    router.get('/edit/contacts', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEditContacts.html"));
    });
    router.get('/edit/success', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEditSuccess.html"));
    });
    return router;
};
exports.getPortfolioRouter = getPortfolioRouter;
