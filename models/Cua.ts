
export interface CreateCua {
    title: string;
    content: string;
    author: string;
    imgUrl?: string;
}

export interface UpdateCua {
    title?: string;
    content?: string;
    imgUrl?: string;
}