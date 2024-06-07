export type UserViewModel = {
    id: number,
    name: string,
    password: string,
    description: {
        age: number,
        gender: string,
        text: string,
        skills: string
    },
    contacts: {
        phone: string,
        address: string,
        email: string,
        socialList: {
            vk: string,
            github: string,
            telegram: string
        }
    }
};