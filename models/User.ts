
export interface CreateUser {
    username: string;
    password: string;
    imgUrl: string;
}

export interface UpdateUser {
    username?: string;
    password?: string;
    imgUrl?: string;
}