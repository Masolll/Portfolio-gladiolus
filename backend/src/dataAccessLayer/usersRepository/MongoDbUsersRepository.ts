import {client} from "./claster";
import {UserViewModel} from "../../models/UserViewModel";
import {UserCreatureModel} from "../../models/UserCreatureModel";
import {UserUpdateModel} from "../../models/UserUpdateModel";
import * as bcrypt from "bcrypt";


const db = client.db("usersbox").collection<UserViewModel>("users");
export const UsersRepository = {
    async findAllUsers() : Promise<UserViewModel[]>{
        return db.find({}).toArray();
    },
    async findUserByName(name: string) : Promise<UserViewModel | null>{
        return db.findOne({'name': name});
    },
    async findUserById(id: number) : Promise<UserViewModel | null>{
        return db.findOne({"id": id});
    },
    async findUserByEmail(email: string) : Promise<UserViewModel | null>{
        return db.findOne({'email': email})
    },
    async creatureUser(body: UserCreatureModel) : Promise<void>{
        await db
            .insertOne({
                id: +(new Date()),
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 7),
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
    },
    async updateUser(id: number, body: any) : Promise<boolean>{
        if (!body){
            return false;
        }
        let updateObject : any = {};
        for (const key in body){
            if (body[key] !== undefined){
                updateObject[key] = body[key];
            }
        }
        const result = await db.updateOne({"id": id},
            {$set: updateObject});
        return result.matchedCount === 1;
    },
    async deleteUserById(id: number) : Promise<boolean>{
        const result = await db.deleteOne({"id": id});
        return result.deletedCount === 1;
    },
    async deleteAllUsers() : Promise<boolean>{
        await db.deleteMany({});
        return true;
    }
}