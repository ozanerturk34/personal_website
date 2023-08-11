import { CategoryBase } from "@models/Category";
import CategoryLabel from "./CategoryLabel";

interface CategoriesLabelProps {
  categories: CategoryBase[];
  spotlight?: boolean;
}

const CategoriesLabel = ({
  categories,
  spotlight = false,
}: CategoriesLabelProps) => {
  return (
    <div className="flex my-1">
      {categories.map((category) => (
        <CategoryLabel
          category={category}
          key={category.slug}
          spotlight={spotlight}
        />
      ))}
    </div>
  );
};

export default CategoriesLabel;
