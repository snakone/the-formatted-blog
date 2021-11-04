export interface Post {
    _id: string;
    title: string;
    category: string;
    message: string;
    date: string;
    author: string;
    image?: string;
    video?: string;
}