import type { GetStaticProps } from "next";
import { Col, Row } from "react-bootstrap";

import { getAllPostsForCard } from "@lib/api";

import PostCard from "@components/PostCard";
import PageLayout from "@components/PageLayout";

import type { PostForCard } from "@models/Blog/Post";

interface BlogProps {
  posts: PostForCard[];
}

const Blog = ({ posts }: BlogProps) => (
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

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const posts = await getAllPostsForCard();
    return {
      props: {
        posts: posts,
      },
    };
  } catch (error) {
    console.log(error, "TODO error loggingss");
    return { notFound: true };
  }
};

export default Blog;
