import type { CategoryBase } from "@models/Category";
import Link from "next/link";

interface CategoryLabelProps {
  category: CategoryBase;
  spotlight?: boolean;
  expand?: boolean;
}

const COLORS: { [key: string]: string } = {
  red: "text-red-800 dark:text-red-700",
  blue: "text-blue-800 dark:text-blue-700",
  yellow: "text-yellow-800 dark:text-yellow-700",
};

const COLORS_AFTER: { [key: string]: string } = {
  red: "after:bg-red-800 after:dark:bg-red-700",
  blue: "after:bg-blue-800 after:dark:bg-blue-700",
  yellow: "after:bg-yellow-800 after:dark:bg-yellow-700",
};
const CategoryLabel = ({
  category: { slug, title, color },
  spotlight = false,
  expand = false,
}: CategoryLabelProps) => {
  return expand ? (
    <p
      className={`flex mr-2 ${COLORS[color]} text-2xl font-semibold flex-grow after:content-['See more posts'] ${COLORS_AFTER[color]} after:h-0.5 after:flex-grow after:self-end after:mb-1 after:mx-2`}
    >
      {title}
    </p>
  ) : (
    <Link
      href={`/blog/topics/${slug}`}
      className={`mr-2 ${COLORS[color]} font-semibold ${
        spotlight ? "sm:text-lg" : ""
      }`}
    >
      {title}
    </Link>
  );
};

export default CategoryLabel;
