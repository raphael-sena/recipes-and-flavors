import { Category } from "../../../enums";
import EnumSelectComponent from "./EnumSelectComponent";

const categoryOptions = [
  { label: "Appetizer", value: Category.APPETIZER },
  { label: "Main Course", value: Category.MAIN_COURSE },
  { label: "Dessert", value: Category.DESSERT },
  { label: "Beverage", value: Category.BEVERAGE },
];

export const CategoryComponent = ({
  selectedCategory,
  onChange,
}: {
  selectedCategory: Category;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <EnumSelectComponent
      label="Category"
      value={selectedCategory}
      onChange={onChange}
      options={categoryOptions}
    />
  );
};
