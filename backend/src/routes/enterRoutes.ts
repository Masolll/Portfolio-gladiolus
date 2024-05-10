import path from "path";
import express from "express";
export const getEnterRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render(path.join(__dirname, "../../ejs-pages/enter.ejs"))
    })
    router.get('/phone', (req, res) =>{
        res.render(path.join(__dirname, "../../ejs-pages/enter-1.ejs"))
    })

    return router;
}