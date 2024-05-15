import path from "path";
import express from "express";

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolio.html"))
    })
    router.get('/edit', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEdit.html"))
    })
    router.get('/edit/contacts', (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditContacts.html"));
    })
    router.get('/edit/success', (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioEditSuccess.html"));
    })

    return router;
}