import express, {Express, Response} from "express";
import {RequestWithBody, RequestWithQuery, RequestWithUri, RequestWithUriAndBody} from "../types";
import {GetFormQueryModel} from "../models/GetFormQueryModel";
import {FormViewModel} from "../models/FormViewModel";
import {FormUriModel} from "../models/FormUriModel";
import {FormCreatureModel} from "../models/FormCreatureModel";
import {FormUpdateModel} from "../models/FormUpdateModel";
import {codeMessage} from "../codeMessage";
import {formRepository} from "../dataAccessLayer/formRepository/formRepository";

export const getFormRouter = () => {
    const router = express.Router();

    router.get('/', (req:RequestWithQuery<GetFormQueryModel>, res:Response<FormViewModel[]>) => {
        res.json(formRepository.findFormsByName(req.query.name));
    })
    router.get("/:id", (req:RequestWithUri<FormUriModel>, res: Response<FormViewModel>) => {
        let findForm = formRepository.findFormById(req.params.id);
        return findForm ? res.json(findForm) : res.sendStatus(codeMessage.NotFound);
    })
    router.post('/', (req:RequestWithBody<FormCreatureModel>, res) => {
        let isCreated = formRepository.creatureForm(req.body.title);
        return isCreated ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.put('/:id', (req:RequestWithUriAndBody<FormUriModel,FormUpdateModel>, res) => {
        let isUpdate = formRepository.updateForm(req.params.id, req.body.title);
        return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })
    router.delete('/:id', (req:RequestWithUri<FormUriModel>, res) => {
        let isDeleted = formRepository.deleteForm(req.params.id);
        return isDeleted ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
    })

    return router;
};