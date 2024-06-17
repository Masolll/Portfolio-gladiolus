import express, {Response, Request, NextFunction} from "express";
import {getUsersRouter} from "./routes/usersRoutes";
import {getMainRouter} from "./routes/mainRoutes";
import {getRegistrationRouter} from "./routes/registrationRoutes";
import {getEnterRouter} from "./routes/enterRoutes";
import {getPortfolioRouter} from "./routes/portfolioRouter";
import {getAllFormsRouter} from "./routes/allFormsRouter";
import path from "path";
import {codeMessage} from "./models/codeMessage";
import {getNodemailerRouter} from "./routes/nodemailerRouter";
import {getDisplayPortfolioRouter} from "./routes/displayPortfolioRoutes";


export const app = express();

export const bodyMiddleWare = express.json();
app.use(bodyMiddleWare);
app.set('view engine', 'ejs');
app.use((req : Request, res : Response, next : NextFunction) => {
    if (req.path.endsWith('.html')) {
        return res
            .status(codeMessage.NotFound)
            .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
                error: codeMessage.NotFound,
                message: "Страница не найдена :("
            });
    }
    next();
});
app.use(express.static(path.join(__dirname, "/../../portfolio")));
app.use(express.static(path.join(__dirname, '../uploads')))

app.use('/', getMainRouter());
app.use('/registration', getRegistrationRouter());
app.use('/portfolio', getPortfolioRouter());
app.use('/enter', getEnterRouter());
app.use('/allForms', getAllFormsRouter());
app.use('/users', getUsersRouter());
app.use('/email', getNodemailerRouter());
app.use('/display', getDisplayPortfolioRouter())
app.use((req : Request, res : Response) => {
    return res
        .status(codeMessage.NotFound)
        .render(path.join(__dirname, "../src/ejsPages/errorPage.ejs"), {
            error: codeMessage.NotFound,
            message: "Страница не найдена :("
        });
});



