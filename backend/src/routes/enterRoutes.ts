import path from "path";
import express from "express";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
import {body, validationResult} from 'express-validator';
import * as bcrypt from 'bcrypt';
import {jwtService} from "../jwtService/jwtService";

export const getEnterRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/enter.html"))
    })
    router.post('/',
        body('email').notEmpty(),
        body('password').notEmpty(),
        async (req, res) => {
        let error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(codeMessage.BadRequest).send('Не пройдена валидация');
        }
        const findUser = await UsersRepository.findUserByEmail(req.body.email);
        if (!findUser){
            return res.status(codeMessage.BadRequest).send('Пользователь с таким email не найден');
        }
        const validPassword = bcrypt.compareSync(req.body.password, findUser!.password);
        if (!validPassword){
            return res.status(codeMessage.BadRequest).send('Введен неверный пароль');
        }
        const token = await jwtService.createJWT(findUser);
        return res.json({token: token});
    })
    router.get('/email', (req, res) =>{
        res.render(path.join(__dirname, "../../ejs-pages/enter-1.ejs"))
    })

    return router;
}