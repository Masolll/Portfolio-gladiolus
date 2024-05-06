import {db} from "./db";
import {FormViewModel} from "../../models/FormViewModel";

export const formRepository = {
    findFormsByName : async (name: string | null | undefined) : Promise<FormViewModel[]>=>{
        if (name){
            return db.forms.filter(e => e.name === name)
        }
        return db.forms;
    },
    findFormById : async (id: number) : Promise<FormViewModel | undefined> => {
        return db.forms.find(c => c.id === id);
    },
    creatureForm : async (title: string | null | undefined) : Promise<boolean> =>{
        if(title){
            let creatureItem : FormViewModel = {
                "id": +(new Date),
                "name": title
            }
            db.forms.push(creatureItem);
            return true;
        }
        return false;
    },
    updateForm : async (id: number, title: string) : Promise<boolean> =>{
        let foundItem = db.forms.find(c => c.id === id);
        if (!foundItem || !title){
            return false;
        }
        foundItem.name = title;
        return true;
    },
    deleteFormById :async (id: number) : Promise<boolean> =>{
        let deleteItem = db.forms.find(f => f.id === id)
        if (!deleteItem){
            return false;
        }
        db.forms = db.forms.filter(f => f.id != id);
        return true;
    },
    deleteFormAll : async():Promise<boolean>=>{
        db.forms = [];
        return true;
    }
}
