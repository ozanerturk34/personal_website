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

export const getAllPosts = () =>
  client.fetch(`*[_type == 'blog']{ ${postFields} }`);
