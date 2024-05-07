import {client} from "./claster";
import {FormViewModel} from "../../models/FormViewModel";


const db = client.db("usersbox").collection<FormViewModel>("users");
export const formRepository = {
    findFormsByName : async (name: string | null | undefined) : Promise<FormViewModel[]>=>{
        let findItem = {}
        if (name){
            findItem = {"name": name};
        }
        return db.find(findItem).toArray();
    },
    findFormById : async (id: number) : Promise<FormViewModel | null> => {
        return db.findOne({"id": id});
    },
    creatureForm : async (title: string | null | undefined) : Promise<boolean> =>{
        //по хорошему здесь не должно быть проверки title, она должна быть в validator
        if(title){
            await db
                .insertOne({
                    "id": +(new Date()),
                    "name": title
                })
            return true;
        }
        return false;
    },
    updateForm : async (id: number, name: string|null|undefined) : Promise<boolean> =>{
        if (!name){
            return false;
        }
        const result = await db.updateOne({"id": id},{$set: {"name": name}});
        return result.matchedCount === 1;
    },
    deleteFormById :async (id: number) : Promise<boolean> =>{
        const result = await db.deleteOne({"id": id});
        return result.deletedCount === 1;
    },
    deleteFormAll :async () : Promise<boolean> =>{
        await db.deleteMany({});
        return true;
    }
}