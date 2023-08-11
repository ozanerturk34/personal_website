import Link from "next/link";

import CategoryLabel from "./CategoryLabel";

import type { Category } from "@models/Category";

interface CategoryHeaderProps {
  category: Category;
}

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <div className="px-2">
      <div className="flex">
        <CategoryLabel category={category} expand={true} />
        <Link
          href={`/blog/topics/${category.slug}`}
          className="float-right hover:underline self-end text-green-800 dark:text-green-700"
        >
          See more articles
        </Link>
      </div>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryHeader;
