import path from "path";
import express from "express";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {RequestWithUriAndBody} from "../models/requestTypes";
import {UserUriModel} from "../models/UserUriModel";
import {UserUpdateModel} from "../models/UserUpdateModel";
import {codeMessage} from "../models/codeMessage";

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.get('/',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolio.html"))
    })
    router.put('/:id', async (req:RequestWithUriAndBody<UserUriModel,UserUpdateModel>, res) => {
        let isUpdate = await UsersRepository.updateUser(+req.params.id, req.body);
        return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.get('/edit',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEdit.html"))
    })
    router.get('/edit/contacts',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditContacts.html"));
    })
    router.get('/edit/success',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditSuccess.html"));
    })
    return router;
}