import {client} from "./claster";
import {UserViewModel} from "../../models/UserViewModel";
import {UserCreatureModel} from "../../models/UserCreatureModel";
import {UserUpdateModel} from "../../models/UserUpdateModel";
import * as bcrypt from "bcrypt";


const db = client.db("usersbox").collection<UserViewModel>("users");
export const UsersRepository = {
    findAllUsers: async():Promise<UserViewModel[]>=>{
        return db.find({}).toArray();
    },
    findUserByName : async (name: string) : Promise<UserViewModel | null>=>{
        return db.findOne({'name': name});
    },
    findUserById : async (id: number) : Promise<UserViewModel | null> => {
        return db.findOne({"id": id});
    },
    findUserByEmail: async(email: string)=>{
        return db.findOne({'email': email})
    },
    creatureUser : async (body: UserCreatureModel) : Promise<void> =>{
        await db
            .insertOne({
                "id": +(new Date()),
                "name": body.name,
                'email': body.email,
                'password': await bcrypt.hash(body.password, 7)
            });
    },
    updateUser : async (id: number, body: UserUpdateModel|null|undefined) : Promise<boolean> =>{
        if (!body){
            return false;
        }
        const result = await db.updateOne({"id": id},
            {$set: {"name": body.name, "email": body.email, 'password': body.password}});
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