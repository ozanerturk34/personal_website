import client from "@lib/sanity";

import type { Category, CategoryWithPosts } from "@models/Category";
import type { Post, PostForCard } from "@models/Post";
import type { SlugObject } from "@models/shared";
import type { Author } from "@models/Author";

const imageFields = (field: string) =>
  `'${field}': { 'alt': ${field}.alt, 'asset': ${field}.asset-> }`;

const authorFields = `
  name, 
  ${imageFields("avatar")},
  'slug': slug.current,
  about
`;

const categoryBaseFields = `
  title,
  'slug': slug.current
`;

const categoryFields = `
  ${categoryBaseFields},
  description
`;

const basePostFields = `
  title,
  publishedAt,
  'author': author->{ ${authorFields} },
  categories[]->{ ${categoryBaseFields} }
`;

const postCardFields = `
  ${basePostFields},
  ${imageFields("thumbnail")},
  'slug': slug.current
`;

const categoryWithPostsFields = `
  ${categoryBaseFields},
  'posts': *[_type=='post' && references(^._id)] { ${postCardFields} }
`;

const postDetailFields = `
  ${basePostFields},
  content[]{ ..., 'asset': asset-> }
`;

const onlySlugField = `
  'slug': slug.current
`;

export const getAllPostsForCard = () =>
  client.fetch<PostForCard[]>(`*[_type == 'post']{ ${postCardFields} }`);

export const getAllPostSlugs = () =>
  client.fetch<SlugObject[]>(`*[_type == 'post'] { ${onlySlugField} }`);

export const getPostBySlug = async (slug: string) =>
  (
    await client.fetch<Post[]>(
      `*[_type == 'post' && slug.current == $slug]{ ${postDetailFields} }`,
      {
        slug,
      }
    )
  )[0];

export const getAllCategorySlugs = () =>
  client.fetch<SlugObject[]>(`*[_type == 'category'] { ${onlySlugField} }`);

export const getCategoryBySlug = async (slug: string) =>
  (
    await client.fetch<Category[]>(
      `*[_type == 'category' && slug.current == $slug]{ ${categoryFields} }`,
      {
        slug,
      }
    )
  )[0];

export const getPostsForCategory = (slug: string) =>
  client.fetch<PostForCard[]>(
    `*[_type == 'post' && $slug in categories[]->slug.current]{ ${postCardFields} }`,
    {
      slug,
    }
  );

// TODO add limit
export const getAllCategoriesWithPosts = () =>
  client.fetch<CategoryWithPosts[]>(
    `*[_type == 'category']{ ${categoryWithPostsFields} }`
  );

export const getAllAuthorSlugs = () =>
  client.fetch<SlugObject[]>(`*[_type == 'author'] { ${onlySlugField}} `);

export const getAuthorBySlug = async (slug: string) =>
  (
    await client.fetch<Author[]>(
      `*[_type == 'author' && slug.current == $slug] { ${authorFields} }`,
      { slug }
    )
  )[0];

export const getPostsForAuthor = (slug: string) =>
  client.fetch<PostForCard[]>(
    `*[_type == 'post' && author->slug.current == $slug] { ${postCardFields} }`,
    { slug }
  );
