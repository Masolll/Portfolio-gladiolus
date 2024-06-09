import path from "path";
import express, {Response} from "express";
import {RequestWithQuery} from "../models/requestTypes";
import {GetUserQueryModel} from "../models/GetUserQueryModel";
import {UserViewModel} from "../models/UserViewModel";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
export const getAllFormsRouter = () => {
    const router = express.Router();

    router.get('/', async (req:RequestWithQuery<GetUserQueryModel>, res:Response<UserViewModel[]>) => {
        if (Object.keys(req.query).length > 0){
            let users = await UsersRepository.findUsersByQueryParams(req.query);
            return users
                ? res.render(path.join(__dirname, "../../src/ejsPages/allForms.ejs"), {users: users})
                : res.sendStatus(codeMessage.BadRequest);
        }else{
            let users = await UsersRepository.findAllUsers();
            res.render(path.join(__dirname, "../../src/ejsPages/allForms.ejs"), {users: users});
        }
    })

    return router;
}