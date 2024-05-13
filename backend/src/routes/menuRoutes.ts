import path from "path";
import express from "express";
export const getMenuRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/menu.html"))
    })

    return router;
}