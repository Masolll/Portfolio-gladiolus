import express, {Response, Request, NextFunction} from "express";
import {getUsersRouter} from "./routes/usersRoutes";
import {getMainRouter} from "./routes/mainRoutes";
import path from "path";

export const app = express();

//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);
app.use(express.static(path.join(__dirname, "../../portfolio")))

app.use('/', getMainRouter())
app.use('/users', getUsersRouter());





