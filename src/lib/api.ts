import client from "@lib/sanity";

import type { Post, PostForCard, PostWithOnlySlug } from "@models/Post";

const imageFields = (field: string) =>
  `'${field}': { 'alt': ${field}.alt, 'asset': ${field}.asset-> }`;

const postAuthorFields = `
  name, 
  ${imageFields("avatar")}
`;

const basePostFields = `
  title,
  date,
  'author': author->{ ${postAuthorFields} }
`;

const postCardFields = `
  ${basePostFields},
  ${imageFields("thumbnail")},
  'slug': slug.current
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
  client.fetch<PostWithOnlySlug[]>(`*[_type == 'post'] { ${onlySlugField} }`);

export const getPostBySlug = async (slug: string) =>
  (
    await client.fetch<Post[]>(
      `*[_type == 'post' && slug.current == $slug]{ ${postDetailFields} }`,
      {
        slug,
      }
    )
  )[0];
