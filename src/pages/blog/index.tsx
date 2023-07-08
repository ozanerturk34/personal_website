import type { GetStaticProps } from "next";
import { Col, Row } from "react-bootstrap";

import { getAllCategoriesWithPosts, getAllPostsForCard } from "@lib/api";

import PostCard from "@components/Post/PostCard";
import PageLayout from "@components/PageLayout";

import type { PostForCard } from "@models/Post";
import type { CategoryWithPosts } from "@models/Category";
import CategoryCard from "@components/Category/CategoryCard";
import Subscriber from "@components/Subscriber";

interface BlogProps {
  posts: PostForCard[];
  categories: CategoryWithPosts[];
}

const Blog = ({ posts, categories }: BlogProps) => (
  <PageLayout>
    <Col>
      <Row>
        {posts.map((post) => (
          <Col key={post.slug}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
      <Row>
        {categories.map((category) => (
          <Col key={category.slug}>
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
    </Col>
    <Col>
      <Subscriber />
    </Col>
  </PageLayout>
);

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const posts = await getAllPostsForCard();
    const categories = await getAllCategoriesWithPosts(1);
    return {
      props: {
        posts,
        categories,
      },
    };
  } catch (error) {
    console.error(error, "TODO error loggingss");
    return { notFound: true };
  }
};

export default Blog;
