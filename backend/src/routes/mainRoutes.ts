import path from "path";
import express from "express";
export const getMainRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render(path.join(__dirname, "../../ejs-pages/index.ejs"))
    })

    return router;
}
