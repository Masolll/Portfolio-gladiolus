"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const getPortfolioRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolio.html"));
    });
    router.get('/edit', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEdit.html"));
    });
    router.get('/edit/contacts', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEditContacts.html"));
    });
    router.get('/edit/success', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../../../portfolio/portfolioEditSuccess.html"));
    });
    return router;
};
exports.getPortfolioRouter = getPortfolioRouter;
