import type { Author } from "./Author";
import { CategoryBase } from "./Category";
import type { SanityImageWithAlt } from "./Image";

export interface PostWithOnlySlug {
  slug: string;
}

export interface PostBase {
  title: string;
  date: string;
  author: Author;
  categories: CategoryBase[];
}

export interface PostForCard extends PostWithOnlySlug, PostBase {
  slug: string;
  thumbnail: SanityImageWithAlt;
}

export interface Post extends PostWithOnlySlug, PostBase {
  content: any[];
}
