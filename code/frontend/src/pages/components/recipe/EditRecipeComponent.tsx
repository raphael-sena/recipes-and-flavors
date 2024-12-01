import { useState, useEffect } from "react";
import axios from "axios";
import CuisinesComponent from "../EnumComponents/CuisinesComponent";
import { DifficultyComponent } from "../EnumComponents/DifficultyComponent";
import { Category, DietType, Difficulty, UnitType } from "@/enums";
import { CategoryComponent } from "../EnumComponents/CategoryComponent";
import { DietTypeComponent } from "../EnumComponents/DietTypeComponent";
import IngredientComponent from "./IngredientComponent";
import MethodComponent from "../MethodComponent";
import { IoIosTime } from "react-icons/io";
import { Ingredient } from "@/models/Ingredient";
import { Method } from "@/models/Method";

const EditRecipeComponent = ({ recipeId }: { recipeId: number }) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [image, setImage] = useState<File | null>(null);
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

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!recipeId || isNaN(Number(recipeId))) {
            console.error("Invalid recipe ID:", recipeId);
            return;
          }

        const token = localStorage.getItem("authtoken");
        const response = await fetch(
          `http://localhost:8080/recipe/${recipeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Dados da receita:" + data);
        setRecipeData({
          ...data,
          preparationTime: data.preparationTime?.value || 0,
          cookTime: data.cookTime?.value || 0,
          preparationTimeUnit: data.preparationTime?.unit || "min",
          cookTimeUnit: data.cookTime?.unit || "min",
        });
        setIngredients(data.ingredients || []);
        setMethods(data.methods || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selected image:", e.target.files?.[0]);
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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

    const preparationTime = `PT${
      recipeData.preparationTime
    }${recipeData.preparationTimeUnit[0].toUpperCase()}`;
    const cookTime = `PT${
      recipeData.cookTime
    }${recipeData.cookTimeUnit[0].toUpperCase()}`;

    const recipePayload = {
      userId: recipeData.userId,
      name: recipeData.name,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit.toString().toUpperCase(),
      })),
      methods: methods.map((method) => ({ description: method.description })),
      preparationTime,
      cookTime,
      servings: recipeData.servings,
      dietType: recipeData.dietType.toUpperCase(),
      cuisineType: recipeData.cuisineType.toUpperCase(),
      difficulty: recipeData.difficulty.toUpperCase(),
      category: recipeData.category.toUpperCase(),
    };

    try {
      const token = localStorage.getItem("authtoken");
      await axios.put(
        `http://localhost:8080/recipe/${recipeId}`,
        recipePayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post(
          `http://localhost:8080/recipe/${recipeId}/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Recipe updated successfully!");
      window.location.href = "/my-recipes";
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
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

  const handleDeleteRecipe = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );
  
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("authtoken");
      await fetch(
        `http://localhost:8080/recipe/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Recipe deleted successfully!");
      // window.location.href = "/my-recipes";
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading recipe data...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="font-mulish lg:items-center lg:justify-items-center"
    >
      <h1 className="font-bold text-3xl xl:my-4 xl:text-center">
        Edit Recipe
        <hr className="h-px mb-2 bg-darkBlue border-0 xl:hidden" />
      </h1>
      <div className="xl:flex xl:flex-col-2 xl:gap-4 xl:items-center xl:justify-items-center mb-2">
        {/* Informações da Receita */}
        <div>
          {/* Nome da Receita */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-darkBlue text-2xl">
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

          {/* Recipe Infos*/}
          <div>
            <h3 className="text-2xl mb-2 text-darkBlue">Recipe Infos</h3>
            <hr className="h-px mb-2 bg-darkBlue border-0" />

            <div className="lg:grid lg:grid-row-2">
              {/* Upload de Imagem */}
              <div className="flex justify-between">
                <div className="mb-2 w-2/3">
                  <label
                    htmlFor="image"
                    className="block text-lightBlue font-medium"
                  >
                    Upload recipe image...
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="input-class text-darkBlue w-full"
                  />
                </div>

                {recipeData.image && (
                  <div className="mb-2 w-1/3">
                    <h4 className="text-darkBlue">Recipe Image</h4>
                    <img
                      src={recipeData.image}
                      alt="Recipe"
                      className="w-full rounded-md mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-start lg:grid lg:grid-rows-2 lg:grid-flow-col lg:gap-2">
              {/* Tipo de Cozinha */}
              <div className="flex space-x-2 mb-2">
                <div className="w-full">
                  <label
                    htmlFor="cuisine"
                    className="block text-lightBlue font-medium"
                  >
                    Cuisine Type
                  </label>
                  <CuisinesComponent
                    selectedCuisine={recipeData.cuisineType}
                    onChange={(e) =>
                      setRecipeData({
                        ...recipeData,
                        cuisineType: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Dieta */}
              <DietTypeComponent
                selectedDietType={recipeData.dietType as DietType}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, dietType: e.target.value })
                }
              />

              {/* Número de Porções */}
              <div className="lg:w-full lg:pr-2 mb-2">
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
            </div>
          </div>
        </div>

        {/* Ingredientes e Preparo*/}
        <div className="xl:mx-12 xl:px-12">
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
        </div>
      </div>

      <div className="text-white font-bold text-lg xl:w-80">
        <button
          type="submit"
          className="bg-lightBlue hover:bg-darkBlue px-4 py-2 rounded-xl w-full mb-2"
        >
          Save Recipe
        </button>

        <button
          type="button"
          onClick={discardChanges}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl w-full mb-2"
        >
          Discard Changes
        </button>

        <button
          type="button"
          onClick={handleDeleteRecipe}
          className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-xl w-full mb-2"
        >
          Delete Recipe
        </button>
      </div>
    </form>
  );
};

export default EditRecipeComponent;
