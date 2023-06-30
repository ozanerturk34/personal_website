import type { GetStaticProps } from "next";

import { getAllPosts } from "@lib/api";

import PostCard from "@components/PostCard";
import PageLayout from "@components/PageLayout";

import type { Post } from "@models/Post";
import { Col, Row } from "react-bootstrap";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <PageLayout>
      <div>
        <Row>
          {posts.map((post) => (
            <Col key={post.slug}>
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
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
