import client from "@lib/sanity";

const postAuthorFields = `
  name, 
  'avatar': avatar.asset->url 
`;

const postFields = `
  title,
  'slug': slug.current,
  date,
  'thumbnail': thumbnail.asset->url,
  'author': author->{ ${postAuthorFields} }
`;

const onlySlugField = `
  'slug': slug.current
`;

export const getAllPosts = () =>
  client.fetch(`*[_type == 'blog']{ ${postFields} }`);

export const getAllPostSlugs = () =>
  client.fetch(`*[_type == 'blog'] { ${onlySlugField} }`);

export const getPostBySlug = async (slug: string) =>
  (
    await client.fetch(
      `*[_type == 'blog' && slug.current == $slug]{ ${postFields} }`,
      {
        slug,
      }
    )
  )[0];
