import express, {Express, Response} from "express";
import {RequestWithBody, RequestWithQuery, RequestWithUri, RequestWithUriAndBody} from "../types";
import {GetFormQueryModel} from "../models/GetFormQueryModel";
import {FormViewModel} from "../models/FormViewModel";
import {FormUriModel} from "../models/FormUriModel";
import {FormCreatureModel} from "../models/FormCreatureModel";
import {FormUpdateModel} from "../models/FormUpdateModel";
import {codeMessage} from "../codeMessage";
import {formRepository} from "../dataAccessLayer/formRepository/MongoDbFormRepository";

export const getFormRouter = () => {
    const router = express.Router();

    router.get('/', async (req:RequestWithQuery<GetFormQueryModel>, res:Response<FormViewModel[]>) => {
        res.json(await formRepository.findFormsByName(req.query.name));
    })
    router.get("/:id", async (req:RequestWithUri<FormUriModel>, res: Response<FormViewModel>) => {
        let findForm = await formRepository.findFormById(+req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage.NotFound);
    })
    router.post('/', async (req:RequestWithBody<FormCreatureModel>, res) => {
        let isCreated = await formRepository.creatureForm(req.body.title);
        return isCreated ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.put('/:id', async (req:RequestWithUriAndBody<FormUriModel,FormUpdateModel>, res) => {
        let isUpdate = await formRepository.updateForm(+req.params.id, req.body.title);
        return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.delete('/', async (req:RequestWithUri<FormUriModel>, res) => {
        let isDeleted = await formRepository.deleteFormAll();
        return isDeleted ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.delete('/:id', async (req:RequestWithUri<FormUriModel>, res) => {
        let isDeleted = await formRepository.deleteFormById(+req.params.id);
        return isDeleted ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })

    return router;
};