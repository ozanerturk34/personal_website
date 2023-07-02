import { Author } from "./Author";
import { Thumbnail } from "./Image";

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
  thumbnail: Thumbnail;
}

export interface Post extends PostWithOnlySlug, PostBase {
  content: any[];
}
