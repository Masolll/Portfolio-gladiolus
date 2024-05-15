import express, {Response, Request, NextFunction} from "express";
import {getUsersRouter} from "./routes/usersRoutes";
import {getMainRouter} from "./routes/mainRoutes";
import {getRegistrationRouter} from "./routes/registrationRoutes";
import {getEnterRouter} from "./routes/enterRoutes";
import {getPortfolioRouter} from "./routes/portfolioRouter";
// import {getMenuRouter} from "./routes/menuRoutes";
import path from "path";
import {jwtMiddleware} from "./jwtService/jwtMiddleware";

export const app = express();

//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);
//подключаю шаблонизатор ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/../../portfolio")))

//страницы доступные всем пользователям
app.use('/', getMainRouter());
app.use('/registration', getRegistrationRouter());
app.use('/portfolio', getPortfolioRouter())
app.use('/enter', getEnterRouter());

//страницы доступные только авторизованным полльзователям
// app.use(jwtMiddleware);
app.use('/users', getUsersRouter());
// app.use('/menu/', getMenuRouter());





