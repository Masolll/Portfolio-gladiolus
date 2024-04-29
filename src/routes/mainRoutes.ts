import path from "path";
import express from "express";
export const getMainRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        const filePath = path.join(__dirname, "../../src/index.html")
        console.log(__dirname)
        res.sendFile(filePath)
    })

    return router;
}
