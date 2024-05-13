import request from 'supertest'
import {response, Response} from "express";
import {UserCreatureModel} from "../../src/models/UserCreatureModel";
import {UserViewModel} from "../../src/models/UserViewModel";
import {app} from "../../src/app";
import {codeMessage} from "../../src/models/codeMessage"
describe('/myTest', ()=>{
    beforeAll(async()=>{
        await request(app).delete('/users')
    })

    it('GET/form should be ok and empty array', async()=>{
        await request(app)
            .get('/users')
            .expect(200)
    })
    it('POST/form should be BadRequest if unccorrect body', async()=>{
        let postData : UserCreatureModel = {name: ""};
        await request(app)
            .post('/users')
            .send(postData)
            .expect(codeMessage.BadRequest)
        await request(app)
            .get('/users')
            .expect(codeMessage.OK)
    })
    let arrayCreatureForms : UserViewModel[] = [];
    it('POST/form create normal form', async()=>{
        let postData : UserCreatureModel = {title: 'Sasha'};
        await request(app)
            .post('/users')
            .send(postData)
            .expect(codeMessage.NoContent)
        let response = await request(app)
            .get("/users");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{"_id": expect.any(String), "id": expect.any(Number), "name": "Sasha"}])
    })
    it('PUT/form correct form', async()=>{
        await request(app)
            .put('/users/'+arrayCreatureForms[0].id)
            .send({'title': 'Georgiy'})
            .expect(codeMessage.NoContent);
        let response = await request(app)
            .get("/users");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{"_id": expect.any(String), "id": arrayCreatureForms[0].id, "name": "Georgiy"}])
    })
    it('PUT/form uncorrect title', async()=>{
        await request(app)
            .put('/users/'+arrayCreatureForms[0].id)
            .send({'title': ''})
            .expect(codeMessage.BadRequest);
    })
    it('PUT/form uncorrect id', async()=>{
        await request(app)
            .put('/users/-100')
            .send({'title': 'Vanya'})
            .expect(codeMessage.BadRequest)
    })
    it('GET/URI correct form', async()=>{
        await request(app)
            .get('/users/'+arrayCreatureForms[0].id)
            .expect(200, arrayCreatureForms[0])
    })
    it('POST/form create normal form', async()=>{
        let postData : UserCreatureModel = {title: 'вова'};
        await request(app)
            .post('/users')
            .send(postData)
            .expect(codeMessage.NoContent)
        let response = await request(app)
            .get("/users");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([
            {"_id": expect.any(String), "id": expect.any(Number), "name": "Georgiy"},
            {"_id": expect.any(String), "id": expect.any(Number), "name": "вова"}])
    })
    it('DELETE/URI', async()=>{
        await request(app)
            .delete('/users/'+arrayCreatureForms[0].id)
            .expect(codeMessage.NoContent)
        let response = request(app)
            .get("/users")
            .expect(codeMessage.OK, [{"_id": expect.any(String), "id": expect.any(Number), "name": "вова"}])
    })
    it('GET/URI get delete form', async()=>{
        await request(app)
            .get('/users/'+arrayCreatureForms[0].id)
            .expect(codeMessage.NotFound)
    })
})