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
            return db.findOne({ 'email': email });
        });
    },
    creatureUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db
                .insertOne({
                id: +(new Date()),
                name: body.name,
                email: body.email,
                password: yield bcrypt.hash(body.password, 7),
                description: {
                    text: "",
                    skills: ""
                },
                contacts: {
                    phone: "",
                    address: "",
                    socialList: {
                        vk: "",
                        github: "",
                        telegram: ""
                    }
                }
            });
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
