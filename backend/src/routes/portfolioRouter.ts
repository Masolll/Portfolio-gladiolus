import path from "path";
import express from "express";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {RequestWithUriAndBody} from "../models/requestTypes";
import {UserUriModel} from "../models/UserUriModel";
import {UserUpdateModel} from "../models/UserUpdateModel";
import {codeMessage} from "../models/codeMessage";
import jwt from "jsonwebtoken";

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.get('/description',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioDescription.html"))
    })
    router.get('/contacts',
        jwtMiddleware,
        (req, res) => {
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioContacts.html"))
        })
    router.get('/success',
        jwtMiddleware,
        (req, res)=>{
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccess.html"))
        })
    router.get('/projects',
        jwtMiddleware,
        (req, res)=>{
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioProjects.html"))
        })
    router.get('/description/edit',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioDescriptionEdit.html"))
    })
    router.get('/contacts/edit',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioContactsEdit.html"));
    })
    router.get('/success/edit',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccessEdit.html"));
    })
    router.get('/projects/edit',
        jwtMiddleware,
        (req, res)=>{
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioProjectsEdit.html"));
        })
    router.put('/:id', async (req:RequestWithUriAndBody<UserUriModel,UserUpdateModel>, res) => {
        let isUpdate = await UsersRepository.updateUser(+req.params.id, req.body);
        return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })

    return router;
}