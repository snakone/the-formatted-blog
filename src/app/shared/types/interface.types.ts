// POST
export interface Post {
  _id: string;
  title: string;
  category: string;
  message: string;
  created: string;
  author: string;
  image?: string;
  video?: string;
}

export interface PostResponse extends ServerResponse {
 posts: Post[];
 post: Post;
 page?: number;
}

// DRAFT
export interface DraftList {
  ref: string;
  title: string;
  created: string;
  badges?: DraftBadge[];
  active?: boolean;
}

export interface DraftBadge {
  label: string;
  class: string;
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
  [key: string]: number;
  friends: number;
  posts: number;
  likes: number;
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

// LIST
export interface IconList {
  icon: string;
  label: string;
  route?: string;
}

export interface ActionList {
  icon: string;
  label: string;
  action: string;
}

// SERVICE WORKER
export interface SWResponse extends ServerResponse {
  updated?: boolean;
}

export interface NotificationPayload {
  title?: string;
  body: string;
  icon?: string;
  vibrate?: number[];
  requireInteraction?: boolean;
  image?: string;
  data?: NotificationData;
  actions: NotificationAction[];
  user?: string;
  broadcast?: boolean;
  device?: string | RegExp;
}

interface NotificationData {
  url?: string;
  data?: any;
}

interface NotificationAction {
  action: string;
  title: string;
}
