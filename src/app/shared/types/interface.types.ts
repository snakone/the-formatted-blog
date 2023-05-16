import { DeltaStatic } from "quill";

// POST
export interface Post {
  _id?: string; // Mongo ID
  slug?: string;
  title?: string;
  category?: string;
  message?: DeltaStatic; // Quill Delta
  created?: string; // Date
  author?: string;
  cover?: string; // Image
  intro?: string;
  status?: DraftStatus;
  active?: boolean; // Current Post
  headers?: PostHeader[]; // Index
  user?: string; // User ID of the Post
  check?: DraftCheck; // Draft Check to become Post
  adminSeenOnce?: boolean; // Admin saw the Post at least once since the last edit
  temporal?: boolean; // When a Post is editing but still it's not a Draft
  type?: 'draft' | 'post';
}

export interface PostResponse extends ServerResponse {
 posts: Post[];
 post: Post;
 page?: number;
 drafts?: Post[];
 draft?: Post;
}

export interface PostHeader {
  text: string;
  id: string;
}

export type DraftStatus = 'not-seen' | 'seen' | 'pending' | 'approved';
export type AccountType = 'Super' | 'Admin' | 'User' | 'Guest';

// USER
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profesion: string;
  bio: string;
  stats: UserStats;
  account?: AccountType;
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
  label?: string;
  route?: string;
}

export interface TextList {
  label: string;
  key: string;
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

export interface FavoriteResponse extends ServerResponse { 
  favorites?: string[];
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
  admin?: boolean;
}

interface NotificationData {
  url?: string;
  data?: any;
}

interface NotificationAction {
  action: string;
  title: string;
}

export interface KeyPair {
  key: string;
  value: any;
}

export interface SavingType {
  type: 'saving' | 'warning';
  value: boolean;
}

export interface FilterType {
  [key: string]: string | number | boolean;
  type?: SearchType;
}

export type SearchType = 'post' | 'draft' | 'favorite';

export interface StatusButtons {
  status: string;
  active: boolean;
}

// CHECK
export interface DraftCheck {
  hasGoodTitle?: CheckStatus;
  hasGoodCategory?: CheckStatus;
  hasGoodCover?: CheckStatus;
  hasGoodIntro?: CheckStatus;
  hasGoodMessage?: CheckStatus;
}

export interface CheckStatus {
  ok?: boolean;
  cause?: string;
}

export interface CheckStatusList {
  name: string;
  hint: string;
  icon: string;
  prop: string;
  desc: string;
  checkProp: string;
  checkMessage: string;
  cause: string;
}

export interface DraftPreviewDialogData {
  updateStatus?: boolean;
  draft?: Post;
}

export interface ConfirmationDialogProps {
  title: string;
  message: string;
}
