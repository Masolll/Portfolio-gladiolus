export type GetUserQueryModel = {
    name: string,
    gender: string,
    skills: string,//навыки разделены запятой и парсятся в findUsersByQueryParams, это навыки которые передают в query
    city: string,
    minAge:string,
    maxAge: string,
}
// & {[key: string]: string};//объединение с индексным типом, чтобы ts не ругался в методе findUserByQueryParams