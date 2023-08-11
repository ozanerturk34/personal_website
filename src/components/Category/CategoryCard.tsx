import type { CategoryWithPosts } from "@models/Category";
import PostList from "@components/Post/PostList";
import CategoryHeader from "./CategoryHeader";

interface CategoryCardProps {
  category: CategoryWithPosts;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="mt-12">
      <CategoryHeader category={category} />
      <PostList posts={category.posts} horizontal={true} inCategory={true} />
    </div>
  );
};

export default CategoryCard;
