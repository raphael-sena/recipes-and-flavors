import { DietType } from "../../../enums";
import EnumSelectComponent from "./EnumSelectComponent";

const dietOptions = [
  { label: "Vegetarian", value: DietType.VEGETARIAN },
  { label: "Vegan", value: DietType.VEGAN },
  { label: "Carnivore", value: DietType.CARNIVORE },
  { label: "Low Carb", value: DietType.LOW_CARB },
  { label: "Keto", value: DietType.KETO },
  { label: "Mediterranean", value: DietType.MEDITERRANEAN },
  { label: "Gluten Free", value: DietType.GLUTEN_FREE },
  { label: "Lactose Free", value: DietType.LACTOSE_FREE },
];

export const DietTypeComponent = ({
  selectedDietType,
  onChange,
}: {
  selectedDietType: DietType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <EnumSelectComponent
      label="Diet Type"
      value={selectedDietType}
      onChange={onChange}
      options={dietOptions}
    />
  );
};
