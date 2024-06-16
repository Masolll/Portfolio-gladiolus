export type UserViewModel = {
    id: number,
    name: string,
    password: string,
    description: {
        avatar: string,
        text: string,
        skills: string[]
    },
    contacts: {
        age: number,
        phone: string,
        address: {
            street: string,
            city: string,
            state: string
        },
        gender: string,
        email: string,
        socialList: {
            vk: string,
            tiktok: string,
            github: string,
            telegram: string
        }
    }
    success: {
        fixedCertificates: string[],
        notFixedCertificates: string[]
    }
    projects: {
        project1: string,
        project2: string,
        project3: string,
        project4: string
    }
};