"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioRouter = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../businessLayer/jwtService/jwtMiddleware");
const MongoDbUsersRepository_1 = require("../dataAccessLayer/usersRepository/MongoDbUsersRepository");
const codeMessage_1 = require("../models/codeMessage");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars/');
    },
    filename(req, file, callback) {
        callback(null, Math.random().toString() + file.originalname); //не любое имя файлу можно задать, иногда это причина ошибок
        //имя должно быть уникальным
    }
}); //это нужно для хранения документов в локальной папке "uploads/avatars/" (можно назвать как угодно, но я так делал)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === "image/png") {
            callback(null, true); //это позволит загрузить изображение в папку
        }
        else {
            callback(null, false); //если расширение не то, то ошибки не будет, просто изображение не загрузиться в папку
        }
    }
});
const getPortfolioRouter = () => {
    const router = express_1.default.Router();
    router.put('/', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            let isUpdate = yield MongoDbUsersRepository_1.UsersRepository.updateUser(req.user.id, req.body);
            return isUpdate ? res.sendStatus(codeMessage_1.codeMessage.NoContent) : res.sendStatus(codeMessage_1.codeMessage.BadRequest);
        }
        else {
            return res.sendStatus(codeMessage_1.codeMessage.BadRequest);
        }
    }));
    router.put('/avatar', jwtMiddleware_1.jwtMiddleware, upload.single("avatar"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user && req.file) {
            yield MongoDbUsersRepository_1.UsersRepository.updateUser(req.user.id, {
                'description.avatar': req.file.buffer.toString('base64')
            });
            return res.send(yield MongoDbUsersRepository_1.UsersRepository.findUserById(req.user.id));
        }
        else {
            return res.status(400).send('Не удалось обновить аватар(');
        }
    }));
    router.post('/notFixedCertificate', jwtMiddleware_1.jwtMiddleware, upload.single("certificate"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user && req.file) {
            yield MongoDbUsersRepository_1.UsersRepository.uploadNotFixedCertificate(req.user.id, {
                'certificate': req.file.buffer.toString('base64')
            });
            return res.send(yield MongoDbUsersRepository_1.UsersRepository.findUserById(req.user.id));
        }
        else {
            return res.status(400).send('Не удалось загрузить сертификат(');
        }
    }));
    router.put('/fixedCertificates', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            yield MongoDbUsersRepository_1.UsersRepository.cloneNotFixedCertificatesInFixedCertificates(req.user.id, req.user.success.notFixedCertificates);
            return res.send(yield MongoDbUsersRepository_1.UsersRepository.findUserById(req.user.id));
        }
        else {
            return res.status(400).send('Не получилось обновить сертификаты(');
        }
    }));
    router.delete('/notFixedCertificates', jwtMiddleware_1.jwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            yield MongoDbUsersRepository_1.UsersRepository.updateUser(req.user.id, { "success.notFixedCertificates": [] });
            return res.send(yield MongoDbUsersRepository_1.UsersRepository.findUserById(req.user.id));
        }
        else {
            return res.status(400).send('Не получилось удалить сертификаты(');
        }
    }));
    router.get('/description', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioDescription.ejs"), { user: req.user });
    });
    router.get('/contacts', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioContacts.ejs"), { user: req.user });
    });
    router.get('/success', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioSuccess.ejs"), { user: req.user });
    });
    router.get('/projects', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioProjects.ejs"), { user: req.user });
    });
    router.get('/description/edit', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioDescriptionEdit.ejs"), { user: req.user });
    });
    router.get('/contacts/edit', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioContactsEdit.ejs"), { user: req.user });
    });
    router.get('/success/edit', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioSuccessEdit.ejs"), { user: req.user });
    });
    router.get('/projects/edit', jwtMiddleware_1.jwtMiddleware, (req, res) => {
        res.render(path_1.default.join(__dirname, "../../src/ejsPages/portfolioProjectsEdit.ejs"), { user: req.user });
    });
    return router;
};
exports.getPortfolioRouter = getPortfolioRouter;
