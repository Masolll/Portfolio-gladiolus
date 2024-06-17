import {client} from "./claster";
import {UserViewModel} from "../../models/UserViewModel";
import * as bcrypt from "bcrypt";
import {GetUserQueryModel} from "../../models/GetUserQueryModel";
import {Buffer} from "buffer";
import * as buffer from "buffer";
import {UserCreatureModel} from "../../models/UserCreatureModel";
import {CertificateUploadModel} from "../../models/CertificateUploadModel";

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
        if (params.maxAge!=="" && params.maxAge && params.minAge!=="" && params.minAge){
            const {minAge, maxAge} = params;
            Object.assign(filter, {
                $and: [
                    {"contacts.age": {$gte:parseInt(minAge)}},//gte это больше или равно
                    {"contacts.age": {$lte: parseInt(maxAge)}},
                ]
            })
        }else if(params.maxAge && params.maxAge!==""){
            const {maxAge, minAge} = params;
            Object.assign(filter, {
                'contacts.age': {$lte: parseInt(maxAge)}
            })
        }else if(params.minAge && params.minAge!==""){
            const {minAge, maxAge} = params;
            Object.assign(filter, {
                'contacts.age': {$gte:parseInt(minAge)}
            })
        }
        if(params.skills && params.skills !== "Любые"){
            const {skills} = params;
            Object.assign(filter, {"description.skills": {$all: skills.split(',')}});
        }
        if(params.city && params.city!==""){
            const {city, ...rest} = params;
            Object.assign(filter, {"contacts.address.city": city});
        }
        if(params.gender === "m" || params.gender === "w"){
            const {gender, ...rest} = params;
            Object.assign(filter, {"contacts.gender": gender});
        }else if(params.gender === "none"){
            return [];
        }
        if(params.projects === "true"){
            Object.assign(filter, {
                $or: [
                    {'projects.project1': {$ne:""}},
                    {'projects.project2': {$ne:""}},
                    {'projects.project3': {$ne:""}},
                    {'projects.project4': {$ne:""}}
                ]
            })
        }
        if(params.certificates === "true"){
            Object.assign(filter, {
                'success.fixedCertificates': {$ne:[]}
            })
        }
        return db.find(filter).toArray();
    },
    async creatureUser(body: UserCreatureModel) : Promise<void>{
        await db
            .insertOne({
                id: +(new Date()),
                name: body.name,
                password: await bcrypt.hash(body.password, 7),
                description: {
                    avatar: "",
                    text: "",
                    skills: []
                },
                contacts: {
                    age: 0,
                    email: body.email,
                    phone: "",
                    gender: "",
                    address: {
                        street: "",
                        city: "",
                        state: ""
                    },
                    socialList: {
                        vk: "",
                        tiktok: "",
                        github: "",
                        telegram: ""
                    }
                },
                success: {
                    fixedCertificates: [],
                    notFixedCertificates: []
                },
                projects: {
                    project1: "",
                    project2: "",
                    project3: "",
                    project4: ""
                }
            });
    },
    async uploadNotFixedCertificate(id: number, body: CertificateUploadModel) : Promise<boolean>{
        if (!body['certificate']){
            return false;
        }
        const result = await db.updateOne(
            {"id": id},
            {$push: {'success.notFixedCertificates': body['certificate']}});
        return result.matchedCount === 1;
    },
    async cloneNotFixedCertificatesInFixedCertificates(id: number, notFixedCertificates : string[]){
        const result = await db.updateOne(
            {"id": id},
            { $push: { 'success.fixedCertificates': { $each: notFixedCertificates } } }
        )
        return result.matchedCount === 1;
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