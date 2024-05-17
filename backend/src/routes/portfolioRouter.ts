import path from "path";
import express from "express";
import {jwtMiddleware} from "../jwtService/jwtMiddleware";

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.get('/',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolio.html"))
    })
    router.get('/edit',
        jwtMiddleware,
        (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEdit.html"))
    })
    router.get('/edit/contacts',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditContacts.html"));
    })
    router.get('/edit/success',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditSuccess.html"));
    })

    return router;
}