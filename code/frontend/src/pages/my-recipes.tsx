import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCardComponent";
import { Recipe } from "@/models/Recipe";
import MenuComponent from "./components/MenuComponent";
import { useAuth } from "@/context/UseAuth";
import FooterComponent from "./components/FooterComponent";
import Link from "next/link";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        if (!token) {
          throw new Error("Usuário não autenticado");
        }

        const response = await fetch(
          "http://localhost:8080/recipe/my-recipes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        if (!response.ok) {
          throw new Error("Falha ao buscar receitas");
        }

        const data = await response.json();
        setRecipes(data); // Atualiza o estado com as receitas
      } catch (err: any) {
        setError(err.message); // Em caso de erro, armazena a mensagem de erro
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center">Carregando receitas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Erro: {error}</div>;
  }

  return (
    <div className="p-1 bg-light grid grid-cols-1 sm:grid-cols-2gap-4">
      <div className="z-20">
        <MenuComponent />
      </div>
      <div className="md:ml-64">
        <div className="relative z-10 flex flex-wrap justify-center">
          <h1 className="md:text-4xl md:p-5 md:text-start w-full text-center text-3xl text-darkBlue mb-2">
            Your Recipes
          </h1>
          <hr className="h-px mb-2 bg-darkBlue border-0" />
          {recipes.map((recipe) => (
            <Link href={{
                pathname: '/recipes/'+ recipe.id,
              }}>
                <RecipeCard key={recipe.id} recipe={recipe} />
            </Link>
          ))}
        </div>
      </div>
        <FooterComponent />
    </div>
  );
};

export default MyRecipes;
