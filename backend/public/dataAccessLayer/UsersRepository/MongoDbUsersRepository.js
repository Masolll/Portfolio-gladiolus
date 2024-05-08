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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const claster_1 = require("./claster");
const db = claster_1.client.db("usersbox").collection("users");
exports.UsersRepository = {
    findUserByName: (name) => __awaiter(void 0, void 0, void 0, function* () {
        let findItem = {};
        if (name) {
            findItem = { "name": name };
        }
        return db.find(findItem).toArray();
    }),
    findUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db.findOne({ "id": id });
    }),
    creatureUser: (body) => __awaiter(void 0, void 0, void 0, function* () {
        //по хорошему здесь не должно быть проверки body, она должна быть в validator
        if (body) {
            yield db
                .insertOne({
                "id": +(new Date()),
                "name": body.name,
                'phone': body.phone,
                'password': body.password
            });
            return true;
        }
        return false;
    }),
    updateUser: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        if (!body) {
            return false;
        }
        const result = yield db.updateOne({ "id": id }, { $set: { "name": body.name, "phone": body.phone, 'password': body.password } });
        return result.matchedCount === 1;
    }),
    deleteUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.deleteOne({ "id": id });
        return result.deletedCount === 1;
    }),
    deleteAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.deleteMany({});
        return true;
    })
};
