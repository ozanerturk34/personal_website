import { PostForCard } from "./Post";

export interface CategoryWithOnlySlug {
  slug: string;
}

export interface CategoryBase extends CategoryWithOnlySlug {
  title: string;
}

export interface CategoryLean extends CategoryBase {
  description: string;
}

export interface Category extends CategoryLean {
  posts: PostForCard[];
}
