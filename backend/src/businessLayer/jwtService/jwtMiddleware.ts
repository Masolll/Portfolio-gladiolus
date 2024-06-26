import express, {NextFunction, Request, Response} from "express";
import {jwtService} from "./jwtService";
import {RequestWithUser} from "../../models/RequestWithUser";
import {codeMessage} from "../../models/codeMessage";
import path from "path";

export async function jwtMiddleware(req : RequestWithUser, res : Response, next : NextFunction){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        if (!req.headers.cookie){
            throw new Error();
        }
        const cookieData = req.headers.cookie;//извлекаю токен вида "Bearer <тут токен>"
        const tokenData = cookieData
            .split(";")
            .find(e => e.trim().startsWith("token="));
        const bearerToken = tokenData ? tokenData.split("=")[1] : null;
        const token = bearerToken ? bearerToken.split(" ")[1] : null;
        if (!token){
            throw new Error();
        }
        const findUser = await jwtService.getUserByToken(token);
        if (!findUser){
            throw new Error(`пользователь не найден по токену ${token}`);
        }
        req.user = findUser;
        next()
    }catch(error){
        next();
        //передаю управление потому что на некоторых страницах нужно смотреть авторизован пользователь или нет
        //и на основании этого генерировать страницу либо с кнопкой "регистрация" либо с кнопкой ведущей в лк
        //поэтому здесь не стоит возвращать ошибку
    }
}
