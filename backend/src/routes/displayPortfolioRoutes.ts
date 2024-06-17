import {RequestWithUser} from "../models/RequestWithUser";

const path = require('path')
const express = require('express');
import {Request, Response} from "express";
import {RequestWithQuery, RequestWithUri} from "../models/requestTypes";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
import {UserUriModel} from "../models/UserUriModel";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
export const getDisplayPortfolioRouter = () => {
    const router = express.Router();

    router.get('/description/:id',
        jwtMiddleware,
        async (req:RequestWithUser, res: Response) => {
        const findUser = await UsersRepository.findUserById(+req.params.id);
        if (findUser){
            res.render(path.join(__dirname, "../../src/ejsPages/displayDescription.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }else{
            return res
                .status(codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                    error: codeMessage.NotFound,
                    message: "Страница не найдена :("
                });
        }
    })
    router.get('/contacts/:id',
        jwtMiddleware,
        async (req:RequestWithUser, res: Response) => {
        const findUser = await UsersRepository.findUserById(+req.params.id);
        if (findUser){
            res.render(path.join(__dirname, "../../src/ejsPages/displayContacts.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }else{
            return res
                .status(codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                    error: codeMessage.NotFound,
                    message: "Страница не найдена :("
                });
        }
    })
    router.get('/success/:id',
        jwtMiddleware,
        async (req:RequestWithUser, res: Response) => {
        const findUser = await UsersRepository.findUserById(+req.params.id);
        if (findUser){
            res.render(path.join(__dirname, "../../src/ejsPages/displaySuccess.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }else{
            return res
                .status(codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                    error: codeMessage.NotFound,
                    message: "Страница не найдена :("
                });
        }
    })
    router.get('/projects/:id',
        jwtMiddleware,
        async (req:RequestWithUser, res: Response) => {
        const findUser = await UsersRepository.findUserById(+req.params.id);
        if (findUser){
            res.render(path.join(__dirname, "../../src/ejsPages/displayProjects.ejs"), {
                user: findUser,
                myUser: req.user
            });
        }else{
            return res
                .status(codeMessage.NotFound)
                .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                    error: codeMessage.NotFound,
                    message: "Страница не найдена :("
                });
        }
    })

    return router;
}