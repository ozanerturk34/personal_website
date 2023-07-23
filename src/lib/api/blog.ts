import { readClient } from "@lib/sanity";

import {
  authorFields,
  categoryFields,
  categoryWithPostsFields,
  onlySlugField,
  postCardFields,
  postDetailFields,
} from "./definitions";

import type { Category, CategoryWithPosts } from "@models/Category";
import type { Post, PostForCard } from "@models/Post";
import type { SlugObject } from "@models/shared";
import type { Author } from "@models/Author";

export const getAllPostsForCard = () =>
  readClient.fetch<PostForCard[]>(`*[_type == 'post']{ ${postCardFields} }`);

export const getAllPostSlugs = () =>
  readClient.fetch<SlugObject[]>(`*[_type == 'post'] { ${onlySlugField} }`);

export const getPostBySlug = async (slug: string) =>
  (
    await readClient.fetch<Post[]>(
      `*[_type == 'post' && slug.current == $slug]{ ${postDetailFields} }`,
      {
        slug,
      }
    )
  )[0];

export const getAllCategorySlugs = () =>
  readClient.fetch<SlugObject[]>(`*[_type == 'category'] { ${onlySlugField} }`);

export const getCategoryBySlug = async (slug: string) =>
  (
    await readClient.fetch<Category[]>(
      `*[_type == 'category' && slug.current == $slug]{ ${categoryFields} }`,
      {
        slug,
      }
    )
  )[0];

export const getPostsForCategory = (slug: string) =>
  readClient.fetch<PostForCard[]>(
    `*[_type == 'post' && $slug in categories[]->slug.current]{ ${postCardFields} }`,
    {
      slug,
    }
  );

// TODO add limit
export const getAllCategoriesWithPosts = () =>
  readClient.fetch<CategoryWithPosts[]>(
    `*[_type == 'category']{ ${categoryWithPostsFields} }`
  );

export const getAllAuthorSlugs = () =>
  readClient.fetch<SlugObject[]>(`*[_type == 'author'] { ${onlySlugField}} `);

export const getAuthorBySlug = async (slug: string) =>
  (
    await readClient.fetch<Author[]>(
      `*[_type == 'author' && slug.current == $slug] { ${authorFields} }`,
      { slug }
    )
  )[0];

export const getPostsForAuthor = (slug: string) =>
  readClient.fetch<PostForCard[]>(
    `*[_type == 'post' && author->slug.current == $slug] { ${postCardFields} }`,
    { slug }
  );
