import express, {Response, Request, NextFunction} from "express";
import {getUsersRouter} from "./routes/usersRoutes";
import {getMainRouter} from "./routes/mainRoutes";
import {getRegistrationRouter} from "./routes/registrationRoutes";
import {getEnterRouter} from "./routes/enterRoutes";
import {getMenuRouter} from "./routes/menuRoutes";
import path from "path";

export const app = express();

//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);
//подключаю шаблонизатор ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/../../portfolio/")))

app.use('/', getMainRouter());
app.use('/users', getUsersRouter());
app.use('/registration/', getRegistrationRouter());
app.use('/enter/', getEnterRouter());
app.use('/menu/', getMenuRouter());





