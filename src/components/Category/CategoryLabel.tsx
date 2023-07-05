import { CategoryBase } from "@models/Category";
import Link from "next/link";

interface CategoryLabelProps {
  category: CategoryBase;
}

const CategoryLabel = ({ category: { slug, title } }: CategoryLabelProps) => {
  return (
    <Link href={`/blog/topics/${slug}`}>
      <h1>{title}</h1>
    </Link>
  );
};

export default CategoryLabel;
