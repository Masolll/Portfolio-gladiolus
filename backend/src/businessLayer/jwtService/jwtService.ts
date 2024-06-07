import {UserViewModel} from "../../models/UserViewModel";
import jwt from 'jsonwebtoken';
import {secretKey} from "./jwtSecretKey";
import {JwtPayload} from "./JwtPayload";
import {UsersRepository} from "../../dataAccessLayer/usersRepository/MongoDbUsersRepository";
export const jwtService = {
    async createJWT(user: UserViewModel){
        const payload : JwtPayload = {
            userId: user.id
        };
        return jwt.sign(payload, secretKey.jwtSecret, {expiresIn: "1y"});
        //токен активен 1 год
    },
    async getUserByToken(token: string){
        try{
            const decodedData:any = jwt.verify(token, secretKey.jwtSecret); //если verify не проходит то падает ошибка
            //в decodedData лежит payload, так как в payload я добавил только id то и здесь в объекте будет только id
            const id = decodedData.userId;
            const findUser  = await UsersRepository.findUserById(id)
            return findUser ? findUser : null;
        }catch(error){
            return null;
        }
    }
}