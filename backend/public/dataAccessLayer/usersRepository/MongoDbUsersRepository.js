"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const claster_1 = require("./claster");
const bcrypt = __importStar(require("bcrypt"));
const db = claster_1.client.db("usersbox").collection("users");
exports.UsersRepository = {
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return db.find({}).toArray();
        });
    },
    findUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.findOne({ 'name': name });
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.findOne({ "id": id });
        });
    },
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.findOne({ 'contacts.email': email });
        });
    },
    findUsersByQueryParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            let resultRest = params;
            if (resultRest.maxAge && resultRest.minAge) {
                const { minAge, maxAge } = resultRest, rest = __rest(resultRest, ["minAge", "maxAge"]);
                resultRest = rest;
                Object.assign(filter, {
                    $and: [
                        { "description.age": { $gte: parseInt(minAge) } }, //gte это больше или равно
                        { "description.age": { $lte: parseInt(maxAge) } },
                    ]
                });
            }
            if (resultRest.skills) {
                const { skills } = resultRest, rest = __rest(resultRest, ["skills"]);
                resultRest = rest;
                Object.assign(filter, { "description.skills": { $all: skills.split(',') } });
            }
            if (resultRest.city) {
                const { city } = resultRest, rest = __rest(resultRest, ["city"]);
                resultRest = rest;
                Object.assign(filter, { "contacts.address.city": city });
            }
            if (resultRest.gender) {
                const { gender } = resultRest, rest = __rest(resultRest, ["gender"]);
                resultRest = rest;
                Object.assign(filter, { "description.gender": gender });
            }
            Object.assign(filter, resultRest); //копирую в объект filter все оставшиеся пары ключ-значение
            return db.find(filter).toArray();
        });
    },
    creatureUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db
                .insertOne({
                id: +(new Date()),
                name: body.name,
                password: yield bcrypt.hash(body.password, 7),
                description: {
                    avatar: "",
                    text: "",
                    skills: []
                },
                contacts: {
                    age: 0,
                    email: body.email,
                    phone: "",
                    gender: "",
                    address: {
                        street: "",
                        city: "",
                        state: ""
                    },
                    socialList: {
                        vk: "",
                        tiktok: "",
                        github: "",
                        telegram: ""
                    }
                },
                success: {
                    fixedCertificates: [],
                    notFixedCertificates: []
                },
                projects: {
                    project1: "",
                    project2: "",
                    project3: "",
                    project4: ""
                }
            });
        });
    },
    uploadNotFixedCertificate(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body['certificate']) {
                return false;
            }
            const result = yield db.updateOne({ "id": id }, { $push: { 'success.notFixedCertificates': body['certificate'] } });
            return result.matchedCount === 1;
        });
    },
    cloneNotFixedCertificatesInFixedCertificates(id, notFixedCertificates) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db.updateOne({ "id": id }, { $push: { 'success.fixedCertificates': { $each: notFixedCertificates } } });
            return result.matchedCount === 1;
        });
    },
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body) {
                return false;
            }
            let updateObject = {};
            for (const key in body) {
                if (body[key] !== undefined) {
                    updateObject[key] = body[key];
                }
            }
            const result = yield db.updateOne({ "id": id }, { $set: updateObject });
            return result.matchedCount === 1;
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db.deleteOne({ "id": id });
            return result.deletedCount === 1;
        });
    },
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.deleteMany({});
            return true;
        });
    }
};
