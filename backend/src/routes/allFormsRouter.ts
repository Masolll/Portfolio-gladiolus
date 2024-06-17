import path from "path";
import express, {Response} from "express";
import {RequestWithQuery} from "../models/requestTypes";
import {GetUserQueryModel} from "../models/GetUserQueryModel";
import {UserViewModel} from "../models/UserViewModel";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {RequestWithUser} from "../models/RequestWithUser";
export const getAllFormsRouter = () => {
    const router = express.Router();

    router.get('/',
        jwtMiddleware,
        async (req:RequestWithUser, res) => {
        if (Object.keys(req.query).length > 0){
            let users = await UsersRepository.findUsersByQueryParams(req.query);
            return users
                ? res.render(path.join(__dirname, "../../src/ejsPages/allForms.ejs"), {
                    users: users,
                    user: req.user
                })
                : res.sendStatus(codeMessage.BadRequest);
        }else{
            let users = await UsersRepository.findAllUsers();
            res.render(path.join(__dirname, "../../src/ejsPages/allForms.ejs"), {
                users: users,
                user: req.user
            });
        }
        //передаю req.user в ejs для того чтобы на странице либо сгенерировать кнопку регистрации либо кнопку для перехода в профиль
    })

    return router;
}