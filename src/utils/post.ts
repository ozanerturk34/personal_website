import { Post, RawPost } from "@models/Post";

export const formatPost = ({
  slug: { current: slug },
  title,
  _createdAt,
}: RawPost): Post => ({ title, slug, createdAt: _createdAt });

export const formatPosts = (rawPosts: RawPost[]) =>
  rawPosts.map((rawPost) => formatPost(rawPost));
