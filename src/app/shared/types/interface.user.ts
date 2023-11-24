import { AccountType, UserActivityType } from "./interface.app";

// USER
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  stats: UserStats;
  account?: AccountType;
  avatar?: string;
}

export interface UserProfile {
  role?: string;
  bio?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface UserStats {
  friends: number;
  likes: number;
  views?: number;
}

// ACTIVITY
export interface UserActivity {
  message: string;
  title: string;
  date: string;
  type?: UserActivityType;
  admin: boolean;
  userAction?: boolean;
  route?: string;
  slug?: string;
  user?: string;
}


