import {client} from "./claster";
import {UserViewModel} from "../../models/UserViewModel";
import {UserCreatureModel} from "../../models/UserCreatureModel";
import {UserUpdateModel} from "../../models/UserUpdateModel";


const db = client.db("usersbox").collection<UserViewModel>("users");
export const UsersRepository = {
    findUserByName : async (name: string | null | undefined) : Promise<UserViewModel[]>=>{
        let findItem = {}
        if (name){
            findItem = {"name": name};
        }
        return db.find(findItem).toArray();
    },
    findUserById : async (id: number) : Promise<UserViewModel | null> => {
        return db.findOne({"id": id});
    },
    creatureUser : async (body: UserCreatureModel | null | undefined) : Promise<boolean> =>{
        //по хорошему здесь не должно быть проверки body, она должна быть в validator
        if(body){
            await db
                .insertOne({
                    "id": +(new Date()),
                    "name": body.name,
                    'phone': body.phone,
                    'password': body.password
                })
            return true;
        }
        return false;
    },
    updateUser : async (id: number, body: UserUpdateModel|null|undefined) : Promise<boolean> =>{
        if (!body){
            return false;
        }
        const result = await db.updateOne({"id": id},
            {$set: {"name": body.name, "phone": body.phone, 'password': body.password}});
        return result.matchedCount === 1;
    },
    deleteUserById :async (id: number) : Promise<boolean> =>{
        const result = await db.deleteOne({"id": id});
        return result.deletedCount === 1;
    },
    deleteAllUsers :async () : Promise<boolean> =>{
        await db.deleteMany({});
        return true;
    }
}