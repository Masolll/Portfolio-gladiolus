"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormRouter = void 0;
const express_1 = __importDefault(require("express"));
const codeMessage_1 = require("../codeMessage");
const formRepository_1 = require("../dataAccessLayer/formRepository/formRepository");
const getFormRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        res.json(formRepository_1.formRepository.findFormByName(req.query.name));
    });
    router.get("/:id", (req, res) => {
        let findForm = formRepository_1.formRepository.findFormById(req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage_1.codeMessage.NotFound);
    });
    router.post('/', (req, res) => {
        let isCreated = formRepository_1.formRepository.creatureForm(req.body.title);
        return isCreated ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    });
    router.put('/:id', (req, res) => {
        let isUpdate = formRepository_1.formRepository.updateForm(req.params.id, req.body.title);
        return isUpdate ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    });
    router.delete('/:id', (req, res) => {
        let isDeleted = formRepository_1.formRepository.deleteForm(req.params.id);
        return isDeleted ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    });
    return router;
};
exports.getFormRouter = getFormRouter;
