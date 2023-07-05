import type { CategoryLean } from "@models/Category";

interface CategoryHeaderProps {
  category: CategoryLean;
}

const CategoryHeader = ({
  category: { title, description },
}: CategoryHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CategoryHeader;
