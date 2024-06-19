import express, {Request, Response} from "express";
import {sendMessage} from "../businessLayer/emailService/nodemailer";
import {codeMessage} from "../models/codeMessage";
export const getNodemailerRouter = () => {
    const router = express.Router();

    router.post('/',
        async (req : Request, res : Response) => {
        const enterPassword = Math.trunc(Math.random() * 10**6)
        await sendMessage(req.body.email, enterPassword);
        return res.status(codeMessage.OK).json(enterPassword);
    })

    return router;
}