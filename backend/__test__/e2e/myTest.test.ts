import request from 'supertest'
import {response, Response} from "express";
import {FormCreatureModel} from "../../src/models/FormCreatureModel";
import {FormViewModel} from "../../src/models/FormViewModel";
import {app} from "../../src/app";
import {codeMessage} from "../../src/codeMessage"
describe('/myTest', ()=>{
    beforeAll(async()=>{
        await request(app).delete('/test')
    })

    it('GET/form should be ok and empty array', async()=>{
        await request(app)
            .get('/form')
            .expect(200)
    })
    it('POST/form should be BadRequest if unccorrect body', async()=>{
        let postData : FormCreatureModel = {title: ""};
        await request(app)
            .post('/form')
            .send(postData)
            .expect(codeMessage.BadRequest)
        await request(app)
            .get('/form')
            .expect(codeMessage.OK)
    })
    let arrayCreatureForms : FormViewModel[] = [];
    it('POST/form create normal form', async()=>{
        let postData : FormCreatureModel = {title: 'Sasha'};
        await request(app)
            .post('/form')
            .send(postData)
            .expect(codeMessage.NoContent)
        let response = await request(app)
            .get("/form");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{"id": expect.any(Number), "name": "Sasha"}])
    })
    it('PUT/form correct form', async()=>{
        await request(app)
            .put('/form/'+arrayCreatureForms[0].id)
            .send({'title': 'Georgiy'})
            .expect(codeMessage.NoContent);
        let response = await request(app)
            .get("/form");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{"id": arrayCreatureForms[0].id, "name": "Georgiy"}])
    })
    it('PUT/form uncorrect title', async()=>{
        await request(app)
            .put('/form/'+arrayCreatureForms[0].id)
            .send({'title': ''})
            .expect(codeMessage.BadRequest);
    })
    it('PUT/form uncorrect id', async()=>{
        await request(app)
            .put('/form/-100')
            .send({'title': 'Vanya'})
            .expect(codeMessage.BadRequest)
    })
    it('GET/URI correct form', async()=>{
        await request(app)
            .get('/form/'+arrayCreatureForms[0].id)
            .expect(200, arrayCreatureForms[0])
    })
    //предварительно можно добавить еще одну форму
    it('DELETE/URI', async()=>{
        await request(app)
            .delete('/form/'+arrayCreatureForms[0].id)
            .expect(codeMessage.NoContent)
        let response = request(app)
            .get("/form")
            .expect(codeMessage.OK, [])
    })
    it('GET/URI get delete form', async()=>{
        await request(app)
            .get('/form/'+arrayCreatureForms[0].id)
            .expect(codeMessage.NotFound)
    })
})