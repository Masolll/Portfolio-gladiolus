"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formRepository = void 0;
const db_1 = require("./db");
exports.formRepository = {
    findFormByName: (name) => {
        if (name) {
            return db_1.db.forms.filter(e => e.name === name);
        }
        return db_1.db.forms;
    },
    findFormById: (id) => {
        return db_1.db.forms.find(c => c.id === +id);
    },
    creatureForm: (title) => {
        if (title) {
            let creatureItem = {
                "id": Math.random(),
                "name": title
            };
            db_1.db.forms.push(creatureItem);
            return true;
        }
        return false;
    },
    updateForm: (id, title) => {
        let foundItem = db_1.db.forms.find(c => c.id === +id);
        if (!foundItem || !title) {
            return false;
        }
        foundItem.name = title;
        return true;
    },
    deleteForm: (id) => {
        let deleteItem = db_1.db.forms.find(f => f.id === +id);
        if (!deleteItem) {
            return false;
        }
        db_1.db.forms = db_1.db.forms.filter(f => f.id != +id);
        return true;
    }
};
