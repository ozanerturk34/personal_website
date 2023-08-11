import type { CategoryBase } from "@models/Category";
import Link from "next/link";

interface CategoryLabelProps {
  category: CategoryBase;
  spotlight?: boolean;
}

const CategoryLabel = ({
  category: { slug, title },
  spotlight = false,
}: CategoryLabelProps) => {
  return (
    <Link href={`/blog/topics/${slug}`} className=" mr-4">
      <p
        className={`${
          spotlight ? "text-lg" : "text-base"
        } text-green-800 font-semibold`}
      >
        {title}
      </p>
    </Link>
  );
};

export default CategoryLabel;
