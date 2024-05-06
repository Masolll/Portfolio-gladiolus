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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const codeMessage_1 = require("../../src/codeMessage");
describe('/myTest', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/form');
    }));
    it('GET/form should be ok and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/form')
            .expect(200);
    }));
    it('POST/form should be BadRequest if unccorrect body', () => __awaiter(void 0, void 0, void 0, function* () {
        let postData = { title: "" };
        yield (0, supertest_1.default)(app_1.app)
            .post('/form')
            .send(postData)
            .expect(codeMessage_1.codeMessage.BadRequest);
        yield (0, supertest_1.default)(app_1.app)
            .get('/form')
            .expect(codeMessage_1.codeMessage.OK);
    }));
    let arrayCreatureForms = [];
    it('POST/form create normal form', () => __awaiter(void 0, void 0, void 0, function* () {
        let postData = { title: 'Sasha' };
        yield (0, supertest_1.default)(app_1.app)
            .post('/form')
            .send(postData)
            .expect(codeMessage_1.codeMessage.NoContent);
        let response = yield (0, supertest_1.default)(app_1.app)
            .get("/form");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{ "_id": expect.any(String), "id": expect.any(Number), "name": "Sasha" }]);
    }));
    it('PUT/form correct form', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/form/' + arrayCreatureForms[0].id)
            .send({ 'title': 'Georgiy' })
            .expect(codeMessage_1.codeMessage.NoContent);
        let response = yield (0, supertest_1.default)(app_1.app)
            .get("/form");
        arrayCreatureForms = response.body;
        expect(arrayCreatureForms).toEqual([{ "_id": expect.any(String), "id": arrayCreatureForms[0].id, "name": "Georgiy" }]);
    }));
    it('PUT/form uncorrect title', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/form/' + arrayCreatureForms[0].id)
            .send({ 'title': '' })
            .expect(codeMessage_1.codeMessage.BadRequest);
    }));
    it('PUT/form uncorrect id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/form/-100')
            .send({ 'title': 'Vanya' })
            .expect(codeMessage_1.codeMessage.BadRequest);
    }));
    it('GET/URI correct form', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/form/' + arrayCreatureForms[0].id)
            .expect(200, arrayCreatureForms[0]);
    }));
    //предварительно можно добавить еще одну форму
    it('DELETE/URI', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/form/' + arrayCreatureForms[0].id)
            .expect(codeMessage_1.codeMessage.NoContent);
        let response = (0, supertest_1.default)(app_1.app)
            .get("/form")
            .expect(codeMessage_1.codeMessage.OK, []);
    }));
    it('GET/URI get delete form', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/form/' + arrayCreatureForms[0].id)
            .expect(codeMessage_1.codeMessage.NotFound);
    }));
});
