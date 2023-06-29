import type { GetStaticProps } from "next";

import { getAllPosts } from "@lib/api";

import Card from "@components/Card";
import PageLayout from "@components/PageLayout";

import type { Post } from "@models/Post";

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
  try {
    const posts = (await getAllPosts()) as Post[];
    console.log(posts);
    return {
      props: {
        posts: posts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Blog;
