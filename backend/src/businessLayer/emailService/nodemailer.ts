import nodemailer from "nodemailer";

// async await is not allowed in global scope, must use a wrapper
export async function sendMessage() {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 465,
        secure: true,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    await transporter.sendMail({
        from: '"ITConnect" <toni.ward87@ethereal.email>', // sender address
        to: "<fritz.lebsack49@ethereal.email>", // list of receivers
        subject: "Hello ✔", // Subject line
        text: 'яхай', // plain text body
        html: "<b>ваш код</b>", // html body
    });
    console.log('отправлено!');
}