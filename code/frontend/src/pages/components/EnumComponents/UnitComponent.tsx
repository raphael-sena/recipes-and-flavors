import { UnitType } from "../../../enums";
import EnumSelectComponent from "./EnumSelectComponent";

const unitOptions = [
  { label: "Grams", value: UnitType.GRAMS },
  { label: "Kilograms", value: UnitType.KILOGRAMS },
  { label: "Liters", value: UnitType.LITERS },
  { label: "Tablespoons", value: UnitType.TABLESPOONS },
  { label: "Cups", value: UnitType.CUPS },
  { label: "Teaspoons", value: UnitType.TEASPOONS },
  { label: "Units", value: UnitType.UNITS },
];

export const UnitTypeComponent = ({
  selectedUnit,
  onChange,
}: {
  selectedUnit: UnitType;
  onChange: (value: UnitType) => void;
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as keyof typeof UnitType;
  
    if (UnitType[selectedValue]) {
      onChange(UnitType[selectedValue]);
    }
  };

  return (
    <EnumSelectComponent
      label="Unit"
      value={selectedUnit}
      onChange={handleSelectChange}
      options={unitOptions}
    />
  );
};
