import { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getPostsForCategory,
} from "@lib/api";

import PageLayout from "@components/PageLayout";
import CategoryHeader from "@components/Category/CategoryHeader";
import PostList from "@components/Post/PostList";

import type { PostForCard } from "@models/Post";
import type { Category } from "@models/Category";

interface CategoryPageProps {
  category: Category;
  posts: PostForCard[];
}

const CategoryPage = ({ category, posts }: CategoryPageProps) => {
  return (
    <PageLayout activeLink={"/blog"}>
      <div>
        <CategoryHeader category={category} />
        <hr />
        <PostList posts={posts} />
      </div>
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

  const category: Category = await getCategoryBySlug(params.slug);
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
      category,
      posts,
    },
  };
};

export default CategoryPage;
