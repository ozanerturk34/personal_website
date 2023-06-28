import client from "@lib/sanity";

const postsField = `
    title,
    'slug': slug.current,
    'createdAt': _createdAt
`;

export const getAllPosts = () =>
  client.fetch(`*[_type == 'blog']{ ${postsField} }`);
