import express, {Express, Response} from "express";
import {RequestWithBody, RequestWithQuery, RequestWithUri, RequestWithUriAndBody} from "../models/requestTypes";
import {GetUserQueryModel} from "../models/GetUserQueryModel";
import {UserViewModel} from "../models/UserViewModel";
import {UserUriModel} from "../models/UserUriModel";
import {UserCreatureModel} from "../models/UserCreatureModel";
import {UserUpdateModel} from "../models/UserUpdateModel";
import {codeMessage} from "../models/codeMessage";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import path from "path";

export const getUsersRouter = () => {
    const router = express.Router();

    router.get('/', async (req:RequestWithQuery<GetUserQueryModel>, res:Response<UserViewModel[]>) => {
        if (req.query.name){
            let user = await UsersRepository.findUserByName(req.query.name);
            return user
                ? res.json([user])
                : res.sendStatus(codeMessage.BadRequest);
        }else{
            let users = await UsersRepository.findAllUsers();
            res.json(users);
        }
    })
    router.get("/:id", async (req:RequestWithUri<UserUriModel>, res: Response<UserViewModel>) => {
        let findUser = await UsersRepository.findUserById(+req.params.id);
        return findUser ? res.json(findUser) : res.sendStatus(codeMessage.NotFound);
    })
    router.post('/', async (req:RequestWithBody<UserCreatureModel>, res) => {
        await UsersRepository.creatureUser(req.body);
        return res.sendStatus(codeMessage.NoContent);
    })
    router.put('/:id', async (req:RequestWithUriAndBody<UserUriModel,UserUpdateModel>, res) => {
        let isUpdate = await UsersRepository.updateUser(+req.params.id, req.body);
        return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.delete('/', async (req:RequestWithUri<UserUriModel>, res) => {
        let isDeleted = await UsersRepository.deleteAllUsers();
        return isDeleted ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.delete('/:id', async (req:RequestWithUri<UserUriModel>, res) => {
        let isDeleted = await UsersRepository.deleteUserById(+req.params.id);
        return isDeleted ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })

    return router;
};