import path from "path";
import express from "express";
export const getMenuRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render(path.join(__dirname, "../../ejs-pages/menu.ejs"))
    })

    return router;
}