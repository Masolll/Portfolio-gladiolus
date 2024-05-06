import {app} from "./app";
import {runDb} from "./dataAccessLayer/formRepository/claster";

const port = process.env.PORT || 3000;

const startApp =  async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp();


