import { DeltaStatic } from "quill";
import { DraftCheck } from "./interface.server";
import { DraftStatus, DraftTypes } from "./interface.app";

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
  type?: DraftTypes;
  likes?: number;
  views?: number;
  published?: string; // When the Post was published
}

export interface PostHeader {
  text: string;
  id: string;
}