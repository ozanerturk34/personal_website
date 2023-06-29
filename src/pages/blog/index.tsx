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
    const posts: Post[] = await getAllPosts();
    return {
      props: {
        posts: posts,
      },
    };
  } catch (error) {
    console.log("TODO error logging");
    return { notFound: true };
  }
};

export default Blog;
