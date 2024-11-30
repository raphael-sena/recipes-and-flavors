import { useEffect, useState } from "react";
import RecipeCard from "../components/recipe/RecipeCardComponent";
import { Recipe } from "@/models/Recipe";
import MenuComponent from "../components/MenuComponent";
import FooterComponent from "../components/FooterComponent";
import RecipeModal from "../components/recipe/RecipeModal";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6;
  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = async (page: number) => {
    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const offset: number = (page - 1) * itemsPerPage;

      const response = await fetch(
        `http://localhost:8080/recipe/my-recipes?offset=${offset}&limit=${itemsPerPage}`,
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

      const fetchedTotalCount = data.totalCount || 0; // Total de receitas
      const fetchedRecipes = data.recipes || [];

      setRecipes(fetchedRecipes);
      setTotalRecipes(fetchedTotalCount);
    } catch (err: any) {
      setError(err.message); // Em caso de erro, armazena a mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia a rolagem
    } else {
      document.body.style.overflow = ""; // Restaura a rolagem
    }

    return () => {
      document.body.style.overflow = ""; // Certifica-se de que a rolagem será restaurada quando o componente for desmontado
    };
  }, [isModalOpen]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(totalRecipes / itemsPerPage);
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage); // Incrementa a página
    }
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setCurrentPage(prevPage); // Decrementa a página
    }
  };

  const handleOpenModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setModalOpen(false);
  };

  if (loading) {
    return <div className="text-center">Carregando receitas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Erro: {error}</div>;
  }

  const totalPages: number = Math.ceil(totalRecipes / itemsPerPage);

  return (
    <div className="relative min-h-screen bg-light">
      <div className="z-30">
        <MenuComponent />
      </div>
      <div className="md:ml-64 jsutify-center top-20">
        <div className="relative z-10 justify-center">
          <div className="flex justify-between ">
            <div className="flex justify-between relative ">
              <h1 className="md:text-4xl md:p-5 px-4 md:text-start w-full text-center text-3xl text-darkBlue mb-2">
                Your Recipes
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-end w-full mb-2 gap-2 mr-4 md:mr-10">
                  <button
                    onClick={handlePreviousPage}
                    className="p-2 bg-lightBlue text-white rounded-lg"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="p-2 bg-lightBlue text-white rounded-lg"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
          </div>
          </div>
          <hr className="h-px mb-2 bg-darkBlue border-0" />

          <div className="z-20">
            <div className="flex flex-wrap gap-1 justify-center md:justify-start md:ml-8 lg:ml-16">
              {recipes.map((recipe) => (
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
          </div>

          <div className="flex justify-between items-center md:hidden">
            <span className="pagination flex w-full justify-center">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex justify-end w-full mb-2 gap-2 mr-4 md:mr-10">
                <button
                  onClick={handlePreviousPage}
                  className="p-2 bg-lightBlue text-white rounded-lg"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className="p-2 bg-lightBlue text-white rounded-lg"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
          </div>

          <span className="pagination flex w-full justify-center hidden md:flex">
              Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default MyRecipes;
