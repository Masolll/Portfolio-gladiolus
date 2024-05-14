import express, {NextFunction, Request, Response} from "express";
import {jwtService} from "./jwtService";
import jwt from "jsonwebtoken";
import {secrets} from "./secrets";
import {RequestWithUser} from "../models/RequestWithUser";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";

export async function jwtMiddleware(req : RequestWithUser, res : Response, next : NextFunction){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        if (!req.headers.authorization){
            return res.status(codeMessage.Unauthorized).json({ error: 'Не авторизован' });
        }
        const token = req.headers.authorization.split(" ")[1];//извлекаю токен вида "Bearer <тут токен>"
        const findUser = await jwtService.getUserByToken(token);
        if (!findUser){
            return res.status(codeMessage.Unauthorized).json({ error: 'Не авторизован' });
        }
        req.user = findUser;
        next()
    }catch(error){
        return res.status(codeMessage.Unauthorized).json({ error: 'Не авторизован' });
    }
}
