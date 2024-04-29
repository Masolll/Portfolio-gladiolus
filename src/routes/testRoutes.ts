import express, {Express, Response} from "express";
import {db} from "../db/db";

export const getTestRouter = () => {
    const router = express.Router();

    router.delete("/", (req, res)=>{
        db.forms=[];
        res.sendStatus(200);
    })

    return router;
};