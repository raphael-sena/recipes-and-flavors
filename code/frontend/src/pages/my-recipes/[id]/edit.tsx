import EditRecipeComponent from "@/pages/components/recipe/EditRecipeComponent";
import Footer from "@/pages/components/FooterComponent";
import Navbar from "@/pages/components/MenuComponent";
import SearchBarComponent from "@/pages/components/SearchBarComponent";
import { useRouter } from "next/router";


export default function EditRecipe() {
  const router = useRouter();
  const { id } = router.query;
  console.log("router.query:", router.query);


  const handleSearch = (query: string) => {
    console.log("Realizando a pesquisa por:", query);
  };

  // Aguarda o roteador estar pronto
  if (router.isReady && id) {
    const recipeIdNumber = Array.isArray(id) ? Number(id[0]) : Number(id);
    if (isNaN(recipeIdNumber)) {
      console.error("ID inválido:", id);
      return <p>Invalid Recipe ID</p>;
    }
    return (
      <div className="bg-background min-h-screen font-mulish">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <div className="md:ml-64 xl:mt-4 py-4 lg:pl-6 mx-2 mt-4 md:mt-0">
          <div className="xl:mr-80 xl:pr-64 xl:inset-y-0 xl:left-0">
            <SearchBarComponent onSearch={handleSearch} />
          </div>
          {/* Passando o recipeId como propriedade */}
          <EditRecipeComponent recipeId={recipeIdNumber} />
        </div>
      </div>
      <Footer />
    </div>
    );
  }
}