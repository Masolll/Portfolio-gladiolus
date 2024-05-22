import express, {Response, Request, NextFunction} from "express";
import {getUsersRouter} from "./routes/usersRoutes";
import {getMainRouter} from "./routes/mainRoutes";
import {getRegistrationRouter} from "./routes/registrationRoutes";
import {getEnterRouter} from "./routes/enterRoutes";
import {getPortfolioRouter} from "./routes/portfolioRouter";
import {getAllFormsRouter} from "./routes/allFormsRouter";
import path from "path";

export const app = express();

//на этом шаге подключаем мидлвейер чтобы мы могли обрабатывать body у http запросов
export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);
//подключаю шаблонизатор ejs
app.set('view engine', 'ejs');
app.use((req : Request, res : Response, next : NextFunction) => {
    if (req.path.endsWith('.html')) {
        return res.render(path.join(__dirname, "../ejs-pages/errorPage.ejs"),
            {error: "404",
            message: "Страница не найдена :("});
    }
    next();
});
app.use(express.static(path.join(__dirname, "/../../portfolio")))

//страницы доступные всем пользователям

app.use('/', getMainRouter());
app.use('/registration', getRegistrationRouter());
app.use('/portfolio', getPortfolioRouter());
app.use('/enter', getEnterRouter());
app.use('/allForms', getAllFormsRouter());
app.use('/users', getUsersRouter())
//ошибка если ни один маршрут не подошел
app.use((req : Request, res : Response) => {
    return res.render(path.join(__dirname, "../ejs-pages/errorPage.ejs"),
            {error: "404",
                message: "Страница не найдена :("});
});



