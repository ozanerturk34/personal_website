import { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Col, Row } from "react-bootstrap";

import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getPostsForCategory,
} from "@lib/api";

import PageLayout from "@components/PageLayout";
import CategoryHeader from "@components/Category/CategoryHeader";
import PostList from "@components/Post/PostList";

import type { PostForCard } from "@models/Post";
import type { Category, CategoryLean } from "@models/Category";

interface CategoryPageProps {
  category: Category;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  return (
    <PageLayout>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <CategoryHeader category={category} />
          <hr />
          <PostList posts={category.posts} />
        </Col>
      </Row>
    </PageLayout>
  );
};

interface CategoryPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<CategoryPageParams> = async () => {
  const categories = await getAllCategorySlugs();
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  CategoryPageProps,
  CategoryPageParams
> = async ({ params }) => {
  if (!params?.slug) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const category: CategoryLean = await getCategoryBySlug(params.slug);
  if (!category) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const posts: PostForCard[] = await getPostsForCategory(params.slug);
  if (!posts) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }
  return {
    props: {
      category: {
        ...category,
        posts,
      },
    },
  };
};

export default CategoryPage;
