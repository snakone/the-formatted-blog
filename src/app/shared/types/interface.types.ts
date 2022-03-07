// POST
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

// USER
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profesion: string;
  bio: string;
  stats: UserStats
}

export interface UserStats {
  posts: number;
  likes: number;
  friends: number;
}

// SERVER RESPONSES
interface ServerResponse {
  ok: boolean;
  message?: string;
  err?: any;
}

export interface UserResponse extends ServerResponse {
  user: User;
  token?: string;
}

export interface Snack {
  message: string | null;
  type?: string;
}