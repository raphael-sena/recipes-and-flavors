import { Category, CuisineType, DietType, Difficulty } from "@/enums";
import {
  RecipeHistoryItem,
  RecipeHistoryRequest,
} from "../models/RecipeHistory";
import { useEffect, useReducer, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { getUsers } from "@/services/UserService";
import { fetchRecipeHistory } from "@/services/RecipeQueryHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "./components/MultiSelectComponent";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/DataTableComponent";
import MenuComponent from "./components/MenuComponent";
import RecipeCard from "./components/recipe/RecipeCardComponent";
import RecipeModal from "./components/recipe/RecipeModal";
import { Recipe } from "@/models/Recipe";

// Tipo para ações do reducer
type FormAction = {
  type: "UPDATE_FIELD";
  field: keyof RecipeHistoryRequest;
  value: any;
};

// Estado inicial do formulário
const initialState: RecipeHistoryRequest = {
  userName: [],
  name: "",
  totalTime: 0,
  servings: 0,
  dietType: undefined,
  cuisineType: undefined,
  difficulty: undefined,
  category: undefined,
  page: 0,
  size: 10,
};

function formReducer(
  state: RecipeHistoryRequest,
  action: FormAction
): RecipeHistoryRequest {
  return action.type === "UPDATE_FIELD"
    ? { ...state, [action.field]: action.value }
    : state;
}

function mapRecipeHistoryItemToRecipe(item: RecipeHistoryItem): Recipe {
  return {
    id: item.id,
    name: item.name,
    user: item.user || {
      id: 0,
      name: "Unknown User",
      email: "unknown@example.com",
    },
    ingredients: item.ingredients || [],
    methods: item.methods || [],
    image: item.image || "",
    preparationTime: item.preparationTime || 0,
    cookTime: item.cookTime || 0,
    totalTime: Number(item.totalTime) || 0,
    servings: item.servings || 0,
    dietType: item.dietType || DietType.CARNIVORE,
    cuisineType: item.cuisineType || CuisineType.BRAZILIAN,
    difficulty: item.difficulty || Difficulty.EASY,
    category: item.category || Category.APPETIZER,
    reviews: item.reviews || [],
    deleted: item.deleted || false,
  };
}

export default function RecipeHistory() {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [userOptions, setUserOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [results, setResults] = useState<RecipeHistoryItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeHistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnDef<RecipeHistoryItem>[] = [
    { accessorKey: "id", header: "Recipe Id" },
    { accessorKey: "userName", header: "User Name" },
    { accessorKey: "name", header: "Recipe Name" },
    { accessorKey: "totalTime", header: "Total Time" },
    { accessorKey: "servings", header: "Servings" },
    { accessorKey: "dietType", header: "Diet Type" },
    { accessorKey: "cuisineType", header: "Cuisine Type" },
    { accessorKey: "difficulty", header: "Difficulty" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUserOptions(
          users.map((user: { id: string; name: string }) => ({
            value: user.name,
            label: user.name,
          }))
        );
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filtra campos não preenchidos
    const filteredFormState = Object.fromEntries(
      Object.entries(formState).filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0) &&
          value !== "" &&
          value !== 0
      )
    );

    try {
      const response = await fetchRecipeHistory(
        filteredFormState as RecipeHistoryRequest
      );
      setResults(response.content);
      setTotalResults(response.totalElements);
    } catch (error) {
      console.error("Erro ao buscar o histórico de receitas:", error);
    }
  };

  const handleOpenModal = (recipeItem: RecipeHistoryItem) => {
    const recipe = mapRecipeHistoryItemToRecipe(recipeItem);
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-light bg-center">
      <div className="">
        <MenuComponent />
      </div>

      {/* Conteúdo */}
      <div className="md:ml-64 min-h-screen p-8">
        <h1 className="mb-1 text-3xl font-bold px-1">Search</h1>
        <hr className="h-px mb-3 bg-darkBlue border-0" />
        <div className="space-y-3">
          <Card className="bg-white bg-opacity-80 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="userName"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Select the User
                    </Label>
                    <MultiSelect
                      options={userOptions}
                      onValueChange={(selected) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "userName",
                          value: selected,
                        })
                      }
                      placeholder="Select Users"
                    />
                  </div>

                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Recipe Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "name",
                          value: e.target.value,
                        })
                      }
                      placeholder="Type Recipe Name"
                      className="w-full border-gray-300 focus:border-black focus:ring-black bg-white bg-opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Total Time */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="totalTime"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Total Time (minutes)
                    </Label>
                    <Input
                      id="totalTime"
                      name="totalTime"
                      type="number"
                      value={formState.totalTime || ""}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "totalTime",
                          value: parseInt(e.target.value, 10) || null,
                        })
                      }
                      placeholder="Enter Total Time"
                      className="w-full border-gray-300 focus:border-black focus:ring-black bg-white bg-opacity-50"
                    />
                  </div>

                  {/* Servings */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="servings"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Servings
                    </Label>
                    <Input
                      id="servings"
                      name="servings"
                      type="number"
                      value={formState.servings || ""}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "servings",
                          value: parseInt(e.target.value, 10) || null,
                        })
                      }
                      placeholder="Enter Servings"
                      className="w-full border-gray-300 focus:border-black focus:ring-black bg-white bg-opacity-50"
                    />
                  </div>

                  {/* Diet Type */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="dietType"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Diet Type
                    </Label>
                    <MultiSelect
                      options={Object.values(DietType).map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      onValueChange={(selected) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "dietType",
                          value: selected[0] || null,
                        })
                      }
                      placeholder="Select Diet Type"
                    />
                  </div>

                  {/* Cuisine Type */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="cuisineType"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Cuisine Type
                    </Label>
                    <MultiSelect
                      options={Object.values(CuisineType).map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      onValueChange={(selected) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "cuisineType",
                          value: selected[0] || null,
                        })
                      }
                      placeholder="Select Cuisine Type"
                    />
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="difficulty"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Difficulty
                    </Label>
                    <MultiSelect
                      options={Object.values(Difficulty).map((difficulty) => ({
                        value: difficulty,
                        label: difficulty,
                      }))}
                      onValueChange={(selected) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "difficulty",
                          value: selected[0] || null,
                        })
                      }
                      placeholder="Select Difficulty"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-3 w-full">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-black text-opacity-80"
                    >
                      Category
                    </Label>
                    <MultiSelect
                      options={Object.values(Category).map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      onValueChange={(selected) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "category",
                          value: selected[0] || null,
                        })
                      }
                      placeholder="Select Category"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 text-white transition-all duration-200"
                >
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black">
                Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                {results.map((recipe) => (
                  <div key={recipe.id} onClick={() => handleOpenModal(recipe)}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
              <RecipeModal
                recipe={selectedRecipe}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
