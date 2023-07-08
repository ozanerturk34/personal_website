import type { Author } from "./Author";
import type { CategoryBase } from "./Category";
import type { SanityImageWithAlt } from "./Image";
import type { SlugObject } from "./shared";

export interface PostBase {
  title: string;
  publishedAt: string;
  author: Author;
  categories: CategoryBase[];
}

export interface PostForCard extends SlugObject, PostBase {
  slug: string;
  thumbnail: SanityImageWithAlt;
}

export interface Post extends SlugObject, PostBase {
  content: any[];
}
