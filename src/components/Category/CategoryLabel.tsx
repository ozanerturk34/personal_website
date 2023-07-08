import type { CategoryBase } from "@models/Category";
import Link from "next/link";

interface CategoryLabelProps {
  category: CategoryBase;
}

const CategoryLabel = ({ category: { slug, title } }: CategoryLabelProps) => {
  return (
    <Link href={`/blog/topics/${slug}`}>
      <p>{title}</p>
    </Link>
  );
};

export default CategoryLabel;
