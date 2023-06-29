import client from "@lib/sanity";

const postsField = `
    title,
    'slug': slug.current,
    date,
    'thumbnail': thumbnail.asset->url
`;

export const getAllPosts = () =>
  client.fetch(`*[_type == 'blog']{ ${postsField} }`);
