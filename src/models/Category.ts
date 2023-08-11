import { PostForCard } from "./Post";
import type { SlugObject } from "./shared";

export interface CategoryBase extends SlugObject {
  title: string;
  color: string;
}

export interface Category extends CategoryBase {
  description: string;
}

export interface CategoryWithPosts extends Category {
  posts: PostForCard[];
}
