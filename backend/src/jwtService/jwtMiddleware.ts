import express, {NextFunction, Request, Response} from "express";
import {jwtService} from "./jwtService";
import {RequestWithUser} from "../models/RequestWithUser";
import {codeMessage} from "../models/codeMessage";
import path from "path";

export async function jwtMiddleware(req : RequestWithUser, res : Response, next : NextFunction){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        if (!req.headers.authorization){
            return res.render(path.join(__dirname, "../../ejs-pages/errorPage"),
                {error: "401",
                message: "Эта страница доступна только авторизованным пользователям :)"});
        }
        const token = req.headers.authorization.split(" ")[1];//извлекаю токен вида "Bearer <тут токен>"
        const findUser = await jwtService.getUserByToken(token);
        if (!findUser){
            return res.render(path.join(__dirname, "../../ejs-pages/errorPage"),
                {error: "401",
                    message: "Эта страница доступна только авторизованным пользователям :)"});
        }
        req.user = findUser;
        next()
    }catch(error){
        return res.render(path.join(__dirname, "../../ejs-pages/errorPage"),
            {error: "401",
                message: "Эта страница доступна только авторизованным пользователям :)"});
    }
}
