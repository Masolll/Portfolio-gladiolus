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
exports.formRepository = void 0;
const db_1 = require("./db");
exports.formRepository = {
    findFormsByName: (name) => __awaiter(void 0, void 0, void 0, function* () {
        if (name) {
            return db_1.db.forms.filter(e => e.name === name);
        }
        return db_1.db.forms;
    }),
    findFormById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.db.forms.find(c => c.id === id);
    }),
    creatureForm: (title) => __awaiter(void 0, void 0, void 0, function* () {
        if (title) {
            let creatureItem = {
                "id": +(new Date),
                "name": title
            };
            db_1.db.forms.push(creatureItem);
            return true;
        }
        return false;
    }),
    updateForm: (id, title) => __awaiter(void 0, void 0, void 0, function* () {
        let foundItem = db_1.db.forms.find(c => c.id === id);
        if (!foundItem || !title) {
            return false;
        }
        foundItem.name = title;
        return true;
    }),
    deleteFormById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let deleteItem = db_1.db.forms.find(f => f.id === id);
        if (!deleteItem) {
            return false;
        }
        db_1.db.forms = db_1.db.forms.filter(f => f.id != id);
        return true;
    }),
    deleteFormAll: () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.db.forms = [];
        return true;
    })
};
