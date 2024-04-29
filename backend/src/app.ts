import express, {Response} from "express";
import {getFormRouter} from "./routes/formRoutes";
import {getTestRouter} from './routes/testRoutes';
import {getMainRouter} from "./routes/mainRoutes";
export const app = express();
//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);

app.use('/', getMainRouter())
app.use('/form', getFormRouter());
app.use('/test', getTestRouter());





