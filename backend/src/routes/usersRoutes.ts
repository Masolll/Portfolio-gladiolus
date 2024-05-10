import express, {Express, Response} from "express";
import {RequestWithBody, RequestWithQuery, RequestWithUri, RequestWithUriAndBody} from "../requestTypes";
import {GetUserQueryModel} from "../models/GetUserQueryModel";
import {UserViewModel} from "../models/UserViewModel";
import {UserUriModel} from "../models/UserUriModel";
import {UserCreatureModel} from "../models/UserCreatureModel";
import {UserUpdateModel} from "../models/UserUpdateModel";
import {codeMessage} from "../codeMessage";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import path from "path";

export const getUsersRouter = () => {
    const router = express.Router();

    router.get('/', async (req:RequestWithQuery<GetUserQueryModel>, res:Response<UserViewModel[]>) => {
        // res.json(await UsersRepository.findUserByName(req.query.name));
        let users = await UsersRepository.findUserByName(req.query.name);
        res.render(path.join(__dirname, "../../ejs-pages/users.ejs"), {users: users});
    })
    router.get("/:id", async (req:RequestWithUri<UserUriModel>, res: Response<UserViewModel>) => {
        let findForm = await UsersRepository.findUserById(+req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage.NotFound);
    })
    router.post('/', async (req:RequestWithBody<UserCreatureModel>, res) => {
        let isCreated = await UsersRepository.creatureUser(req.body);
        return isCreated ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
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