import request from 'supertest'
import {response} from "express";
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
    it('POST/form should be BadRequest if uccorrect body', async()=>{
        let postData : FormCreatureModel = {title: ""};
        await request(app)
            .post('/form')
            .send(postData)
            .expect(codeMessage.BadRequest, [])
        await request(app)
            .get('/form')
            .expect(codeMessage.OK, [])
    })
    let arrayCreatureForm : FormViewModel[];
    it('POST/form create normal form', async()=>{
        let postData : FormCreatureModel = {title: 'Sasha'};
        const response = await request(app)
            .post('/form')
            .send(postData)
        arrayCreatureForm = response.body;
        expect(arrayCreatureForm)
            .toEqual([{'id': expect.any(Number), 'name': 'Sasha'}])

        await request(app)
            .get('/form')
            .expect(200, arrayCreatureForm)
    })
    it('PUT/form correct form', async()=>{
        arrayCreatureForm  = [{'id': arrayCreatureForm[0].id, 'name': 'Georgiy'}]

        await request(app)
            .put('/form/'+arrayCreatureForm[0].id)
            .send({'title': 'Georgiy'})
            .expect(200, arrayCreatureForm);
    })
    it('PUT/form uncorrect title', async()=>{
        await request(app)
            .put('/form/'+arrayCreatureForm[0].id)
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
            .get('/form/'+arrayCreatureForm[0].id)
            .expect(200, arrayCreatureForm[0])
    })
    //предварительно можно добавить еще одну форму
    it('DELETE/URI', async()=>{
        await request(app)
            .delete('/form/'+arrayCreatureForm[0].id)
            .expect(codeMessage.NoContent)
    })
    it('GET/URI get delete form', async()=>{
        await request(app)
            .get('/form/'+arrayCreatureForm[0].id)
            .expect(codeMessage.NotFound)
    })

})