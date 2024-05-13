import path from "path";
import express from "express";
export const getMainRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/main.html"))
    })

    return router;
}
