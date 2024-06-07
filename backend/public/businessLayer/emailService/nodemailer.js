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
exports.sendMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// async await is not allowed in global scope, must use a wrapper
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        let testAccount = yield nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 465,
            secure: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        yield transporter.sendMail({
            from: '"ITConnect" <toni.ward87@ethereal.email>', // sender address
            to: "<fritz.lebsack49@ethereal.email>", // list of receivers
            subject: "Hello ✔", // Subject line
            text: 'яхай', // plain text body
            html: "<b>ваш код</b>", // html body
        });
        console.log('отправлено!');
    });
}
exports.sendMessage = sendMessage;
