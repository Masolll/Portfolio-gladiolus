import path from "path";
import express from "express";
export const getMainRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send("Корневой url")
    })

    return router;
}
