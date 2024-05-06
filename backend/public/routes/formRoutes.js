"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormRouter = void 0;
const express_1 = __importDefault(require("express"));
const codeMessage_1 = require("../codeMessage");
const MongoDbFormRepository_1 = require("../dataAccessLayer/formRepository/MongoDbFormRepository");
const getFormRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(yield MongoDbFormRepository_1.formRepository.findFormsByName(req.query.name));
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let findForm = yield MongoDbFormRepository_1.formRepository.findFormById(+req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage_1.codeMessage.NotFound);
    }));
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isCreated = yield MongoDbFormRepository_1.formRepository.creatureForm(req.body.title);
        return isCreated ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isUpdate = yield MongoDbFormRepository_1.formRepository.updateForm(+req.params.id, req.body.title);
        return isUpdate ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isDeleted = yield MongoDbFormRepository_1.formRepository.deleteFormAll();
        return isDeleted ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let isDeleted = yield MongoDbFormRepository_1.formRepository.deleteFormById(+req.params.id);
        return isDeleted ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
    }));
    return router;
};
exports.getFormRouter = getFormRouter;
