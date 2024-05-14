import path from "path";
import express from "express";
import {jwtMiddleware} from "../jwtService/jwtMiddleware";
import {validationResult} from "express-validator";
import {codeMessage} from "../models/codeMessage";
import {RequestWithUser} from "../models/RequestWithUser";
export const getMenuRouter = () => {
    const router = express.Router();

    router.get('/',
        jwtMiddleware,
        (req : RequestWithUser, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()){
            res.status(codeMessage.Unauthorized).send('Пользователь не авторизован');
        }
        // res.sendFile(path.join(__dirname, "../../../portfolio/menu.html"))
            res.send(req.user);
    })

    return router;
}