import express, {Express, Response} from "express";
import path from "path";
import {RequestWithBody, RequestWithQuery, RequestWithUri, RequestWithUriAndBody} from "../types";
import {GetFormQueryModel} from "../models/GetFormQueryModel";
import {FormViewModel} from "../models/FormViewModel";
import {FormUriModel} from "../models/FormUriModel";
import {FormCreatureModel} from "../models/FormCreatureModel";
import {FormUpdateModel} from "../models/FormUpdateModel";
import {codeMessage} from "../codeMessage";
import {db} from "../db/db";

export const getFormRouter = () => {
    const router = express.Router();

    router.get('/', (req:RequestWithQuery<GetFormQueryModel>, res:Response<FormViewModel[]>) => {
        if (req.query.name){//проверяю передали ли query параметр
            res.json(db.forms.filter(e => e.name === req.query.name));
            return;
        }
        res.json(db.forms)
    })
    router.get("/:id", (req:RequestWithUri<FormUriModel>, res: Response<FormViewModel>) => {
        let findForm = db.forms.find(c => c.id === +req.params.id);
        if (!findForm) {
            res.sendStatus(codeMessage.NotFound)
            return;
        }
        return res.json(findForm)
    })
    router.post('/', (req:RequestWithBody<FormCreatureModel>, res:Response<FormViewModel[]>) => {
        if(req.body.title){
            db.forms.push({"id": Math.random(), "name": req.body.title});
            return res.status(codeMessage.Created).json(db.forms);
        }
        res.status(codeMessage.BadRequest).json(db.forms);
    })
    router.put('/:id', (req:RequestWithUriAndBody<FormUriModel,FormUpdateModel>, res:Response<FormViewModel[]>) => {
        let foundItem = db.forms.find(c => c.id === +req.params.id);
        if (!foundItem){
            res.sendStatus(codeMessage.BadRequest);
            return;
        }
        const newName = req.body.title;
        if (!newName){
            res.sendStatus(codeMessage.BadRequest);
        }else{
            foundItem.name = newName;
        }
        res.json(db.forms)
    })
    router.delete('/:id', (req:RequestWithUri<FormUriModel>, res) => {
        let deleteItem = db.forms.find(f => f.id === +req.params.id)
        if (!deleteItem){
            res.send(codeMessage.BadRequest);
            return;
        }
        db.forms = db.forms.filter(f => f.id != +req.params.id);
        res.sendStatus(codeMessage.NoContent);
    })

    return router;
};