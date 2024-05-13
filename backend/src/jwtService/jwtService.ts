import {UserViewModel} from "../models/UserViewModel";
import jwt from 'jsonwebtoken';
import {secrets} from "./secrets";
export const jwtService = {
    async createJWT(user: UserViewModel){
        const payload = {
            userEmail: user.email
        };
        return jwt.sign(payload, secrets.jwtSecret, {expiresIn: "1y"});
        //токен активен 1 год
    }
}