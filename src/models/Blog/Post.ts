import type { Author } from "./Author";
import type { SanityImageWithAlt } from "./Image";

export interface PostWithOnlySlug {
  slug: string;
}

export interface PostBase {
  title: string;
  date: string;
  author: Author;
}

export interface PostForCard extends PostWithOnlySlug, PostBase {
  slug: string;
  thumbnail: SanityImageWithAlt;
}

export interface Post extends PostWithOnlySlug, PostBase {
  content: any[];
}
