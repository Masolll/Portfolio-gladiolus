import {client} from "./claster";
import {UserViewModel} from "../../models/UserViewModel";
import {UserCreatureModel} from "../../models/UserCreatureModel";
import {UserUpdateModel} from "../../models/UserUpdateModel";
import * as bcrypt from "bcrypt";
import {RequestWithQuery} from "../../models/requestTypes";
import {GetUserQueryModel} from "../../models/GetUserQueryModel";


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
        return db.findOne({'contacts.email': email})
    },
    async findUsersByQueryParams(params:Partial<GetUserQueryModel>):Promise<UserViewModel[]>{
        let filter:any = {};
        let resultRest = params;
        if (resultRest.maxAge && resultRest.minAge){
            const {minAge, maxAge, ...rest} = resultRest;
            resultRest = rest;
            Object.assign(filter, {
                $and: [
                    {"description.age": {$gte:parseInt(minAge)}},//gte это больше или равно
                    {"description.age": {$lte: parseInt(maxAge)}},
                ]
            })
        }
        if(resultRest.skills){
            const {skills, ...rest} = resultRest;
            resultRest = rest;
            Object.assign(filter, {"description.skills": {$all: skills.split(',')}});
        }
        if(resultRest.city){
            const {city, ...rest} = resultRest;
            resultRest = rest;
            Object.assign(filter, {"contacts.address.city": city});
        }
        if(resultRest.gender){
            const {gender, ...rest} = resultRest;
            resultRest = rest;
            Object.assign(filter, {"description.gender": gender});
        }
        Object.assign(filter, resultRest); //копирую в объект filter все оставшиеся пары ключ-значение
        return db.find(filter).toArray();
    },
    async creatureUser(body: UserCreatureModel) : Promise<void>{
        await db
            .insertOne({
                id: +(new Date()),
                name: body.name,
                password: await bcrypt.hash(body.password, 7),
                description: {
                    age: 0,
                    gender: "",
                    text: "",
                    skills: []
                },
                contacts: {
                    email: body.email,
                    phone: "",
                    address: {
                        city: ""
                    },
                    socialList: {
                        vk: "",
                        tiktok: "",
                        github: "",
                        telegram: ""
                    }
                },
                projects: {
                    project1: "",
                    project2: "",
                    project3: "",
                    project4: "",
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