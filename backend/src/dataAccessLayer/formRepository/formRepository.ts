import {db} from "./db";
import {FormViewModel} from "../../models/FormViewModel";

export const formRepository = {
    findFormsByName : (name: string | null | undefined)=>{
        if (name){
            return db.forms.filter(e => e.name === name)
        }
        return db.forms;
    },
    findFormById : (id: string) => {
        return db.forms.find(c => c.id === +id);
    },
    creatureForm : (title: string | null | undefined) =>{
        if(title){
            let creatureItem : FormViewModel = {
                "id": Math.trunc(Math.random() * 10**6),
                "name": title
            }
            db.forms.push(creatureItem);
            return true;
        }
        return false;
    },
    updateForm : (id: string, title: string) =>{
        let foundItem = db.forms.find(c => c.id === +id);
        if (!foundItem || !title){
            return false;
        }
        foundItem.name = title;
        return true;
    },
    deleteForm : (id: string) =>{
        let deleteItem = db.forms.find(f => f.id === +id)
        if (!deleteItem){
            return false;
        }
        db.forms = db.forms.filter(f => f.id != +id);
        return true;
    }
}
