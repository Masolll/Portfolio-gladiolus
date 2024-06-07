export type UserViewModel = {
    id: number,
    name: string,
    email: string,
    password: string
    description: {
        text: string,
        skills: string
    },
    contacts: {
        phone: string,
        address: string,
        socialList: {
            vk: string,
            github: string,
            telegram: string
        }
    }
};