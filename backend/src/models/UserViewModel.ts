export type UserViewModel = {
    id: number,
    name: string,
    password: string,
    description: {
        avatar: string,
        age: number,
        gender: string,
        text: string,
        skills: string[]
    },
    contacts: {
        phone: string,
        address: {
            city: string
        },
        email: string,
        socialList: {
            vk: string,
            tiktok: string,
            github: string,
            telegram: string
        }
    }
    projects: {
        project1: string,
        project2: string,
        project3: string,
        project4: string
    }
};