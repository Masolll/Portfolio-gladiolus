import path from "path";
import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {sendMessage} from "../businessLayer/emailService/nodemailer";
import {codeMessage} from "../models/codeMessage";
export const getNodemailerRouter = () => {
    const router = express.Router();

    router.post('/',
        async (req : Request, res : Response) => {
        await sendMessage();
        return res.sendStatus(codeMessage.OK);
    })

    return router;
}