import type { CategoryWithPosts } from "@models/Category";
import CategoryLabel from "./CategoryLabel";
import PostList from "@components/Post/PostList";

interface CategoryCardProps {
  category: CategoryWithPosts;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div>
      <CategoryLabel category={category} />
      <PostList posts={category.posts} horizontal={true} />
    </div>
  );
};

export default CategoryCard;
