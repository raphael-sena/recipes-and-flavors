import { Ingredient } from "./CreateRecipeComponent";
import EnumSelectComponent from "./EnumComponents/EnumSelectComponent";
import { UnitType } from "@/enums";

type IngredientComponentProps = {
  ingredients: Ingredient[];
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  onChange: (index: number, field: string, value: string | UnitType) => void;
};

const IngredientComponent: React.FC<IngredientComponentProps> = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onChange,
}) => {
  return (
    <div className="mb-4 font-mulish">
      <h3 className="text-2xl mb-2">Ingredients</h3>
      <hr className="h-px mb-2 bg-darkBlue border-0"/>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="gap-2 mb-2">
          {/* Nome */}
          <div className="block mb-2">
            <label htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => onChange(index, "name", e.target.value)}
              className="py-2 px-1 block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
            />
          </div>
          <div className="flex gap-2">
            {/* Quantidade */}
          <div>
            <label htmlFor="quantity">
              Quantity
            </label>

            <input
              type="quantity"
              value={ingredient.quantity}
              placeholder="Quantity"
              onChange={(e) => onChange(index, "quantity", e.target.value)}
              className="py-2 px-1 mt-1 block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
            />
          </div>
          {/* Unidade */}
          <EnumSelectComponent<UnitType>
            label="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              onChange(index, "unit", e.target.value as UnitType)
            }
            options={Object.entries(UnitType).map(([key, value]) => ({
              label: key,
              value,
            }))}
          />
          </div>
          {/* Botão para Remover */}
          <button
            type="button"
            onClick={() => onRemoveIngredient(index)}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full mb-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddIngredient}
        className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
      >
        <p>Add Ingredient</p>
      </button>
    </div>
  );
};

export default IngredientComponent;
