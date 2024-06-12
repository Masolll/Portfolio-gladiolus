import path from "path";
import express, {Request, Response} from "express";
import {jwtMiddleware} from "../businessLayer/jwtService/jwtMiddleware";
import {UsersRepository} from "../dataAccessLayer/usersRepository/MongoDbUsersRepository";
import {codeMessage} from "../models/codeMessage";
import {RequestWithUser} from "../models/RequestWithUser";
import multer from "multer";
import {validationResult} from "express-validator";


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/avatars/')
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, Math.random().toString()+file.originalname);//не любое имя файлу можно задать, иногда это причина ошибок
                                                                                //имя должно быть уникальным
    }
})
const upload = multer({
    storage: storage,
    fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (file.mimetype==='image/jpeg'){
            callback(null, true);//это позволит загрузить изображение в папку
        }else{
            callback(null, false);//если расширение не то, то ошибки не будет, просто изображение не загрузиться в папку
        }
    }
});

export const getPortfolioRouter = () => {
    const router = express.Router();

    router.put('/',
        jwtMiddleware,
        async(req:RequestWithUser, res) => {
            if (req.user){
                let isUpdate = await UsersRepository.updateUser(req.user.id, req.body);
                return isUpdate ? res.sendStatus(codeMessage.NoContent) : res.sendStatus(codeMessage.BadRequest);
            }else{
                return res.sendStatus(codeMessage.BadRequest);
            }

        })
    router.get('/description',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
        res.render(path.join(__dirname, "../../src/ejsPages/portfolioDescription.ejs"), {user: req.user})
    })
    router.put('/description/avatar',
        jwtMiddleware,
        upload.single("avatar"),
        async (req:RequestWithUser, res)=>{
            if (req.user && req.file){
                await UsersRepository.updateUser(req.user.id, {'description.avatar': req.file.filename});
                return res.json(req.file.filename);
            }else{
                return res.status(400).send('Не удалось обновить(');
            }
        })
    router.get('/contacts',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioContacts.ejs"), {user: req.user})
        })
    router.get('/success',
        jwtMiddleware,
        (req, res)=>{
            res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccess.html"))
        })
    router.get('/projects',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioProjects.ejs"), {user: req.user})
        })
    router.get('/description/edit',
        jwtMiddleware,
        (req:RequestWithUser, res) => {
        res.render(path.join(__dirname, "../../src/ejsPages/portfolioDescriptionEdit.ejs"), {user: req.user})
    })
    router.get('/contacts/edit',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioContactsEdit.ejs"), {user: req.user});
    })
    router.get('/success/edit',
        jwtMiddleware,
        (req, res)=>{
        res.sendFile(path.join(__dirname, "../../../portfolio/portfolioSuccessEdit.html"));
    })
    router.get('/projects/edit',
        jwtMiddleware,
        (req:RequestWithUser, res)=>{
            res.render(path.join(__dirname, "../../src/ejsPages/portfolioProjectsEdit.ejs"), {user: req.user})
        })


    return router;
}