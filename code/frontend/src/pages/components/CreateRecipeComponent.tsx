import { useState } from "react";
import axios from "axios";
import CuisinesComponent from "./EnumComponents/CuisinesComponent";
import { DifficultyComponent } from "./EnumComponents/DifficultyComponent";
import { Category, DietType, Difficulty, UnitType } from "@/enums";
import { CategoryComponent } from "./EnumComponents/CategoryComponent";
import { DietTypeComponent } from "./EnumComponents/DietTypeComponent";
import IngredientComponent from "./IngredientComponent";
import MethodComponent from "./MethodComponent";
import { IoIosTime } from "react-icons/io";

export type Ingredient = {
  name: string;
  quantity: number;
  unit: UnitType;
};

type Method = {
  description: string;
};

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState({
    userId: "",
    name: "",
    preparationTime: 0,
    cookTime: 0,
    servings: 0,
    dietType: "",
    cuisineType: "",
    difficulty: "",
    category: "",
    image: "",
    preparationTimeUnit: "min",
    cookTimeUnit: "min",
  });

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: 0, unit: UnitType.UNITS },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: string | number,
    value: string | UnitType
  ) => {
    const updatedIngredients = [...ingredients];

    if (field === "unit") {
      const validUnit = Object.values(UnitType).find((unit) => unit === value);
      if (validUnit) {
        updatedIngredients[index].unit = validUnit;
      }
    } else if (field === "quantity") {
      updatedIngredients[index].quantity = Number(value);
    } else if (field === "name") {
      updatedIngredients[index].name = value as string;
    }

    setIngredients(updatedIngredients);
  };

  const handleUnitChange = (index: number, value: UnitType) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].unit = value;
    setIngredients(updatedIngredients);
  };

  const handleAddMethod = () => {
    setMethods([...methods, { description: "" }]);
  };

  const handleRemoveMethod = (index: number) => {
    setMethods(methods.filter((_, i) => i !== index));
  };

  const handleMethodChange = (index: number, value: string) => {
    const updatedMethods = [...methods];
    updatedMethods[index].description = value;
    setMethods(updatedMethods);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // The result is a base64 string
      };
      reader.readAsDataURL(file); // This will trigger the onloadend event
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "preparationTimeUnit") {
      setRecipeData({ ...recipeData, preparationTimeUnit: value });
    } else if (name === "cookTimeUnit") {
      setRecipeData({ ...recipeData, cookTimeUnit: value });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preparationTime = `PT${recipeData.preparationTime}${recipeData.preparationTimeUnit[0].toUpperCase()}`;
    const cookTime = `PT${recipeData.cookTime}${recipeData.cookTimeUnit[0].toUpperCase()}`;

    const userId = localStorage.getItem("authToken");

    const recipePayload = {
      userId: userId,
      name: recipeData.name,
      image: image,
      dietType: recipeData.dietType.toUpperCase(),
      preparationTime,
      cookTime,
      servings: recipeData.servings,
      cuisineType: recipeData.cuisineType.toUpperCase(),
      difficulty: recipeData.difficulty.toUpperCase(),
      category: recipeData.category.toUpperCase(),
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit.toString().toUpperCase(),
      })),
      methods: methods.map((method) => ({
        description: method.description,
      })),
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:8080/recipe", recipePayload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      alert("Recipe created successfully!");
      console.log(response.data);
      setRecipeData({
        userId: "",
        name: "",
        preparationTime: 0,
        cookTime: 0,
        servings: 0,
        dietType: "",
        cuisineType: "",
        difficulty: "",
        category: "",
        image: "",
        preparationTimeUnit: "min",
        cookTimeUnit: "min",
      });
      setIngredients([]);
      setMethods([]);
      setImage(null);
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe. Please try again.");
    }
  };

  const discardChanges = () => {
    setRecipeData({
      userId: "",
      name: "",
      preparationTime: 0,
      cookTime: 0,
      servings: 0,
      dietType: "",
      cuisineType: "",
      difficulty: "",
      category: "",
      image: "",
      preparationTimeUnit: "min",
      cookTimeUnit: "min",
    });
    setIngredients([]);
    setMethods([]);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="font-mulish">
      <h1 className="font-bold text-3xl">
        Create Recipe
        <hr className="h-px mb-2 bg-darkBlue border-0" />
      </h1>

      {/* Nome da Receita */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-lightBlue font-medium">
          Recipe Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
          className="mt-1 py-2 px-1 block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
          required
        />
      </div>

      <h3 className="text-2xl mb-2">Recipe Infos</h3>
      <hr className="h-px mb-2 bg-darkBlue border-0" />

      {/* Upload de Imagem */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-lightBlue font-medium">
          Upload recipe image...
        </label>
        <input
          type="file"
          name="image"
          value={recipeData.image}
          onChange={handleImageUpload}
          accept="image/*"
          className="input-class text-darkBlue"
        />
      </div>

      {/* Tipo de Cozinha e Número de Porções */}
      <div className="flex space-x-2 mb-2">
        <div className="w-full">
          <label htmlFor="cuisine" className="block text-lightBlue font-medium">
            Cuisine Type
          </label>
          <CuisinesComponent
            selectedCuisine={recipeData.cuisineType}
            onChange={(e) =>
              setRecipeData({ ...recipeData, cuisineType: e.target.value })
            }
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="servings"
            className="block text-lightBlue font-medium"
          >
            Total Servings
          </label>
          <input
            type="number"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            className="py-2 px-1 block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
          />
        </div>
      </div>

      {/* Dificuldade */}
      <DifficultyComponent
        selectedDifficulty={recipeData.difficulty as Difficulty}
        onChange={(e) =>
          setRecipeData({ ...recipeData, difficulty: e.target.value })
        }
      />

      {/* Categoria */}
      <CategoryComponent
        selectedCategory={recipeData.category as Category}
        onChange={(e) =>
          setRecipeData({ ...recipeData, category: e.target.value })
        }
      />

      {/* Dieta */}
      <DietTypeComponent
        selectedDietType={recipeData.dietType as DietType}
        onChange={(e) =>
          setRecipeData({ ...recipeData, dietType: e.target.value })
        }
      />

      {/* ingredientes */}
      <IngredientComponent
        ingredients={ingredients}
        onAddIngredient={handleAddIngredient}
        onRemoveIngredient={handleRemoveIngredient}
        onChange={handleIngredientChange}
      />

      {/* Métodos */}
      <MethodComponent
        methods={methods}
        onAddMethod={handleAddMethod}
        onRemoveMethod={handleRemoveMethod}
        onChange={handleMethodChange}
      />

      {/* Infos de Tempo */}
      <div className="my-4">
        <h3 className="text-2xl mb-1">Time</h3>
        <hr className="h-px mb-2 bg-darkBlue border-0" />

        <div className="mb-2 rounded-md">
          <div className="flex text-center text-light rounded gap-2">
            {/* Preparation Time */}
            <div className="bg-lightBlue px-2 py-3 rounded-md w-full">
              <label className="flex items-center mb-1">
                <IoIosTime />
                <p className="px-2">Preparation Time</p>
              </label>
              <div className="flex justify-center">
                <input
                  type="number"
                  name="preparationTime"
                  value={recipeData.preparationTime}
                  onChange={handleChange}
                  className="py-1 px-2 block w-12 rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue bg-lightBlue mr-1"
                />
                <select
                  name="preparationTimeUnit"
                  value={recipeData.preparationTimeUnit}
                  onChange={handleChange}
                  className="bg-lightBlue rounded"
                >
                  <option className="text-darkBlue" value="min">
                    min
                  </option>
                  <option className="text-darkBlue" value="hour">
                    hour
                  </option>
                </select>
              </div>
            </div>

            {/* Cook Time */}
            <div className="bg-lightBlue px-2 py-3 rounded-md w-full">
              <label className="flex items-center mb-1">
                <IoIosTime />
                <p className="px-2">Cook Time</p>
              </label>
              <div className="flex justify-center">
                <input
                  type="number"
                  name="cookTime"
                  value={recipeData.cookTime}
                  onChange={handleChange}
                  className="py-1 px-2 block w-12 rounded-md focus:outline-none focus:ring-2 focus:ring-darkBlue bg-lightBlue mr-1"
                />
                <select
                  name="cookTimeUnit"
                  value={recipeData.cookTimeUnit}
                  onChange={handleChange}
                  className="bg-lightBlue rounded"
                >
                  <option className="text-darkBlue" value="min">
                    min
                  </option>
                  <option className="text-darkBlue" value="hour">
                    hour
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white font-bold text-lg">
        <button
          type="submit"
          className="bg-lightBlue  px-4 py-2 rounded-xl w-full mb-2"
        >
          Create New Recipe
        </button>

        <button
          type="button"
          onClick={discardChanges}
          className="bg-darkRed  px-4 py-2 rounded-xl w-full mb-2"
        >
          Discard Changes
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
