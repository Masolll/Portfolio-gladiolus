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
exports.getDisplayPortfolioRouter = void 0;
const path = require('path');
const express = require('express');
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const getDisplayPortfolioRouter = () => {
    const router = express.Router();
    router.get('/description/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserById(+req.params.id);
        if (findUser) {
            res.render(path.join(__dirname, "../../src/ejsPages/displayDescription.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }
        else {
            return res
                .status(codeMessage_1.codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                error: codeMessage_1.codeMessage.NotFound,
                message: "Страница не найдена :("
            });
        }
    }));
    router.get('/contacts/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserById(+req.params.id);
        if (findUser) {
            res.render(path.join(__dirname, "../../src/ejsPages/displayContacts.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }
        else {
            return res
                .status(codeMessage_1.codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                error: codeMessage_1.codeMessage.NotFound,
                message: "Страница не найдена :("
            });
        }
    }));
    router.get('/success/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserById(+req.params.id);
        if (findUser) {
            res.render(path.join(__dirname, "../../src/ejsPages/displaySuccess.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }
        else {
            return res
                .status(codeMessage_1.codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                error: codeMessage_1.codeMessage.NotFound,
                message: "Страница не найдена :("
            });
        }
    }));
    router.get('/projects/:id', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield MongoDbUsersRepository_1.UsersRepository.findUserById(+req.params.id);
        if (findUser) {
            res.render(path.join(__dirname, "../../src/ejsPages/displayProjects.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }
        else {
            return res
                .status(codeMessage_1.codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                error: codeMessage_1.codeMessage.NotFound,
                message: "Страница не найдена :("
            });
        }
    }));
    return router;
};
exports.getDisplayPortfolioRouter = getDisplayPortfolioRouter;
