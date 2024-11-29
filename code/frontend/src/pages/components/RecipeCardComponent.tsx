import { CuisineType } from "@/enums";
import { Recipe } from "@/models/Recipe";
import Flag from "react-world-flags";
import { cuisines } from "./EnumComponents/CuisinesComponent";
import { formatTime } from "@/services/TimeService";

interface RecipeCardProps {
  recipe: Recipe;
}

const getFlagByCuisine = (cuisine: CuisineType): React.ReactNode => {
  const flags = {
    [CuisineType.ITALIAN]: <Flag code="IT" />,
    [CuisineType.BRAZILIAN]: <Flag code="BR" />,
    [CuisineType.CHINESE]: <Flag code="CN" />,
    [CuisineType.INDIAN]: <Flag code="IN" />,
    [CuisineType.JAPANESE]: <Flag code="JP" />,
    [CuisineType.GERMAN]: <Flag code="DE" />,
    [CuisineType.THAI]: <Flag code="TH" />,
    [CuisineType.MEXICAN]: <Flag code="MX" />,
    [CuisineType.FRENCH]: <Flag code="FR" />,
    [CuisineType.USA]: <Flag code="US" />,
  };

  return flags[cuisine] || null;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const cuisine = cuisines.find(
    (c) => c.name.toLowerCase() === recipe.cuisineType.toLowerCase()
  );

  const getBase64Image = (base64: string) => {
    const imageBase64 = `data:image/png;base64,${base64}`;
    return imageBase64;
  };
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border m-2 mb-4 h-72" style={{width: 350, height: 300}}>

      {/* Imagem, avaliações e bandeira */}
      <div className="relative w-full" style={{ height: 120 }}>
        <img
          width={350}
          height={120}
          src={getBase64Image(recipe.image)}
          alt={recipe.name}
          style={{objectFit: 'cover'}}
        />
        <div className="absolute flex justify-between w-full top-4 left-2 px-2">
          <div className="bg-lighterBlue px-5 items-center justify-center rounded-md text-center">
            {/* Verifica se há reviews */}
            {recipe.reviews.length > 0 ? (
              <span>
                {(
                  recipe.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0
                  ) / recipe.reviews.length
                ).toFixed(1)}{" "}
                ⭐
              </span>
            ) : (
              <span className="text-white font-semibold">No reviews</span>
            )}
          </div>
          <div className="flex items-center mr-2">
            {cuisine && (
              <Flag
                code={cuisine.code}
                style={{ height: "40px", width: "40px" }}
                className="mr-2 rounded"
              />
            )}
          </div>
        </div>
      </div>

      {/* Título, tempo de preparo, categoria e autor */}
      <div className="p-4 relative top-16 text-darkBlue bg-white rounded-b-lg h-full">
        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
        <div className="flex flex-wrap justify-between gap-2 md:gap-4">
          <p>Total Time: {recipe.totalTime}</p>
          <p>
            {recipe.category.charAt(0).toUpperCase() +
              recipe.category.slice(1).toLowerCase()}
          </p>
          <p>
            by:{" "}
            {recipe.user.name.charAt(0).toUpperCase() +
              recipe.user.name.slice(1).toLowerCase()}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default RecipeCard;
