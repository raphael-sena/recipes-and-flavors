import CreateRecipeComponent from "./components/recipe/CreateRecipeComponent";
import Footer from "./components/FooterComponent";
import Navbar from "./components/MenuComponent";
import SearchBarComponent from "./components/SearchBarComponent";

export default function NewRecipe() {
    const handleSearch = (query: string) => {
        console.log("Realizando a pesquisa por:", query);
        // Aqui você pode adicionar a lógica de pesquisa, como chamar uma API, filtrar dados, etc.
      };

    return (
        <div className="bg-background min-h-screen font-mulish">
            <div className="flex flex-col md:flex-row">
                <Navbar />
                <div className="md:ml-64 xl:mt-4 py-4 lg:pl-6 mx-2 mt-4 md:mt-0">
                    <CreateRecipeComponent />
                 </div>
            </div>
            <Footer />
        </div>
    );
}