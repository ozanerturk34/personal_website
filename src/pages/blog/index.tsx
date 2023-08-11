import type { GetStaticProps } from "next";

import { getAllCategoriesWithPosts, getAllPostsForCard } from "@lib/api";

import PostCard from "@components/Post/PostCard";
import PageLayout from "@components/PageLayout";

import type { PostForCard } from "@models/Post";
import type { CategoryWithPosts } from "@models/Category";
import CategoryCard from "@components/Category/CategoryCard";
import Subscriber from "@components/Subscriber";
import Searchbar from "@components/Searchbar";

interface BlogProps {
  posts: PostForCard[];
  categories: CategoryWithPosts[];
}

const Blog = ({ posts, categories }: BlogProps) => {
  const spotlightPost = posts[0];
  const remainingPosts = posts.slice(1);
  return (
    <PageLayout activeLink={"/blog"}>
      <div className="flex">
        <div className="w-2/3">
          <PostCard post={spotlightPost} spotlight={true} />
          <div className="flex flex-wrap">
            {remainingPosts.map((post) => (
              <div key={post.slug} className="w-1/2">
                <PostCard post={post} />
              </div>
            ))}
          </div>
          {categories.map((category) => (
            <div key={category.slug}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
        <div className="w-1/3 flex flex-col py-4 px-8">
          <Searchbar />
          <Subscriber />
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const posts = await getAllPostsForCard();
    const categories = await getAllCategoriesWithPosts();
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
