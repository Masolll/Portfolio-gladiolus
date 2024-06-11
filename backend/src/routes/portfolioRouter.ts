import path from "path";
import express from "express";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {RequestWithUriAndBody} from "../models/requestTypes";
import {UserUriModel} from "../models/UserUriModel";
import {UserUpdateModel} from "../models/UserUpdateModel";
import {codeMessage} from "../models/codeMessage";
import jwt from "jsonwebtoken";
import {RequestWithUser} from "../models/RequestWithUser";

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.get('/description',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
        res.render(path.join(__dirname, "../../src/ejsPages/portfolioDescription.ejs"), {user: req.user})
    })
    router.get('/contacts',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioContacts.ejs"), {user: req.user})
        })
    router.get('/success',
        jwtMiddleware,
        (req, res)=>{
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccess.html"))
        })
    router.get('/projects',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioProjects.ejs"), {user: req.user})
        })
    router.get('/description/edit',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
        res.render(path.join(__dirname, "../../src/ejsPages/portfolioDescriptionEdit.ejs"), {user: req.user})
    })
    router.get('/contacts/edit',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioContactsEdit.ejs"), {user: req.user});
    })
    router.get('/success/edit',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccessEdit.html"));
    })
    router.get('/projects/edit',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioProjectsEdit.ejs"), {user: req.user})
        })
    router.put('/',
        jwtMiddleware,
        async(req:RequestWithUser, res) => {
        if (req.user){
            let isUpdate = await UsersRepository.updateUser(req.user.id, req.body);
            return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
        }else{
            return res.sendStatus(codeMessage.BadRequest);
        }

    })

    return router;
}