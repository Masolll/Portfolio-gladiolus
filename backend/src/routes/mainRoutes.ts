import path from "path";
import express from "express";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {RequestWithUser} from "../models/RequestWithUser";
export const getMainRouter = () => {
    const router = express.Router();

    router.get('/',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
            res.render(path.join(__dirname, "../../src/ejsPages/index.ejs"), {user: req.user})
        })

    return router;
}
