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
const emailPass_1 = require("./emailPass");
function sendMessage(receiverEmail, enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.yandex.ru',
                port: 465,
                secure: true,
                auth: {
                    user: "itconnect66@yandex.ru",
                    pass: emailPass_1.emailPass
                }
            });
            yield transporter.sendMail({
                from: 'itconnect66@yandex.ru', // sender address
                to: receiverEmail, // list of receivers
                subject: "ITConnect подтверждение почты", // Subject line
                html: `<h2>Здравствуйте!</h2>
                   <h2>Ваш код подтверждения:</h2>
                   <h1> ${enterPassword}</h1>
                   <h3>Если возникли ошибки или есть вопросы можете написать нам на почту itconnect66@yandex.ru</h3>
                   <h3>С уважением, команда ITConnect.</h3>`
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendMessage = sendMessage;
