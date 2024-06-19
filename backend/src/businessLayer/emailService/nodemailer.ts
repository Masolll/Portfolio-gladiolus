import nodemailer from "nodemailer";
import {emailPass} from "./emailPass";

export async function sendMessage(receiverEmail: string, enterPassword: number) {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: "yastey637@ya.ru",
                pass: emailPass
            }
        })
        await transporter.sendMail({
            from: 'yastey637@ya.ru', // sender address
            to: receiverEmail, // list of receivers
            subject: "ITConnect подтверждение почты", // Subject line
            html: `<h2>Здравствуйте!</h2>
                   <h2>Ваш код подтверждения:</h2>
                   <h1> ${enterPassword}</h1>
                   <h3>Если возникли ошибки или есть вопросы можете написать нам на почту yastey637@ya.ru</h3>`
        });
    }catch (error){
        console.log(error);
    }

}