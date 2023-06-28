import type { GetStaticProps } from "next";

import { getAllPosts } from "@lib/api";

import { formatPosts } from "@utils/post";

import Card from "@components/Card";
import PageLayout from "@components/PageLayout";

import type { Post, RawPost } from "@models/Post";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <PageLayout>
      <div>
        {posts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const rawPosts: RawPost[] = await getAllPosts();
  const posts = formatPosts(rawPosts);
  return {
    props: {
      posts: posts,
    },
  };
};

export default Blog;
