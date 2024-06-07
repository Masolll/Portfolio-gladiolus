export type GetUserQueryModel = {
    name: string,
    gender: string,
    skills: string,
    city: string,
    minAge:string,
    maxAge: string,
} & {[key: string]: string};//объединение с индексным типом, чтобы ts не ругался в методе findUserByQueryParams