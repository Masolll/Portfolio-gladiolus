import path from "path";
import express from "express";
export const getRegistrationRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render(path.join(__dirname, "../../ejs-pages/registr.ejs"))
    })
    router.get('/phone', (req, res)=>{
        res.render(path.join(__dirname, "../../ejs-pages/registr-1.ejs"))
    })

    return router;
}