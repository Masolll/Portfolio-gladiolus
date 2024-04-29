"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormRouter = void 0;
const express_1 = __importDefault(require("express"));
const codeMessage_1 = require("../codeMessage");
const db_1 = require("../db/db");
const getFormRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        if (req.query.name) { //проверяю передали ли query параметр
            res.json(db_1.db.forms.filter(e => e.name === req.query.name));
            return;
        }
        res.json(db_1.db.forms);
    });
    router.get("/:id", (req, res) => {
        let findForm = db_1.db.forms.find(c => c.id === +req.params.id);
        if (!findForm) {
            res.sendStatus(codeMessage_1.codeMessage.NotFound);
            return;
        }
        return res.json(findForm);
    });
    router.post('/', (req, res) => {
        if (req.body.title) {
            db_1.db.forms.push({ "id": Math.random(), "name": req.body.title });
            return res.status(codeMessage_1.codeMessage.Created).json(db_1.db.forms);
        }
        res.status(codeMessage_1.codeMessage.BadRequest).json(db_1.db.forms);
    });
    router.put('/:id', (req, res) => {
        let foundItem = db_1.db.forms.find(c => c.id === +req.params.id);
        if (!foundItem) {
            res.sendStatus(codeMessage_1.codeMessage.BadRequest);
            return;
        }
        const newName = req.body.title;
        if (!newName) {
            res.sendStatus(codeMessage_1.codeMessage.BadRequest);
        }
        else {
            foundItem.name = newName;
        }
        res.json(db_1.db.forms);
    });
    router.delete('/:id', (req, res) => {
        let deleteItem = db_1.db.forms.find(f => f.id === +req.params.id);
        if (!deleteItem) {
            res.send(codeMessage_1.codeMessage.BadRequest);
            return;
        }
        db_1.db.forms = db_1.db.forms.filter(f => f.id != +req.params.id);
        res.sendStatus(codeMessage_1.codeMessage.NoContent);
    });
    return router;
};
exports.getFormRouter = getFormRouter;
