import path from "path";
import express from "express";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
import {body, validationResult} from 'express-validator';

export const getRegistrationRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/registr.html"))
    })
    // @ts-ignore
    router.post('/',
        body('name').trim().notEmpty(),
        body('email').trim().notEmpty(),
        body('password').trim().notEmpty().withMessage('Error! Пароль не может быть пустым'),
        async (req, res) =>{
        let error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(codeMessage.BadRequest).send('Не пройдена валидация');
        }
        let candidat = await UsersRepository.findUserByEmail(req.body.email)
        if (candidat){
            return res.status(codeMessage.BadRequest).send('Пользователь с таким email уже существует');
        }
        await UsersRepository.creatureUser(req.body);
        return res.sendStatus(codeMessage.NoContent);

    })
    router.get('/email', (req, res)=>{
        res.render(path.join(__dirname, "../../ejs-pages/registr-1.ejs"))
    })

    return router;
}