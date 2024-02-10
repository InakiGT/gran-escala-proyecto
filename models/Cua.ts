
export interface CreateCua {
    title: string;
    content: string;
    author: number;
    imgUrl?: string;
}

export interface UpdateCua {
    title?: string;
    content?: string;
    author: number;
    imgUrl?: string;
}