import client from "@lib/sanity";

export const getAllPosts = () => client.fetch("*[_type == 'blog']");
