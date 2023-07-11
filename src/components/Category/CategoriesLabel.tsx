import { CategoryBase } from "@models/Category";
import CategoryLabel from "./CategoryLabel";

interface CategoriesLabelProps {
  categories: CategoryBase[];
}

const CategoriesLabel = ({ categories }: CategoriesLabelProps) => {
  return (
    <span>
      {categories.map((category) => (
        <CategoryLabel category={category} key={category.slug} />
      ))}
    </span>
  );
};

export default CategoriesLabel;
