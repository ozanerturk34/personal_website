import client from "@lib/sanity";

import { ApiPost, apiPosts } from "@utils/apiTypes";

const postAuthorField = `
  name, 
  'avatar': avatar.asset->url 
`;
const postField = `
  title,
  'slug': slug.current,
  date,
  'thumbnail': thumbnail.asset->url,
  'author': author->{ ${postAuthorField} }
`;

export const getAllPosts: () => Promise<ApiPost[]> = async () =>
  apiPosts(await client.fetch(`*[_type == 'blog']{ ${postField} }`));
