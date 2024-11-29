import React from "react";
import { Recipe } from "@/models/Recipe";
import { Ingredient } from "@/models/Ingredient";
import { Method } from "@/models/Method";
import { IoMdClose } from "react-icons/io";
import { formatDuration } from "@/services/TimeService";
import { IoPencil } from "react-icons/io5";
import Link from 'next/link'


interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !recipe) return null;

  const getBase64Image = (base64: string) => {
    const imageBase64 = `data:image/png;base64,${base64}`;
    return imageBase64;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        {/* Título */}
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{recipe.name}</h2>
                    <Link
                        href={{
                            pathname: '/my-recipes/' + recipe.id + '/edit',
                          }}
                        >
                        <div className="relative group">
                            <IoPencil/>
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                Edit
                            </span>
                        </div>
                    </Link>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    <IoMdClose />
                </button>
            </div>
        </div>

        <div className="flex-1 sm:flex sm:gap-2">
          {/* Imagem */}
          <img
            src={getBase64Image(recipe.image)}
            alt={recipe.name}
            className="mt-4 w-2/3 sm:w-1/2 h-36 object-cover rounded-md"
          />

          {/* Conteúdo */}
          <div className="mt-4 text-start">
            <p className="text-sm text-gray-600">By {recipe.user.name}</p>
            <p className="text-sm text-gray-600">
              Category: {recipe.category}
            </p>
            <p className="text-sm text-gray-600">
              Cuisine: {recipe.cuisineType}
            </p>
            <p className="text-sm text-gray-600">
              Difficulty: {recipe.difficulty}
            </p>
            <p className="text-sm text-gray-600">
              Servings: {recipe.servings} | Total Time:{" "}
              {formatDuration(recipe.totalTime.toString())}
            </p>
          </div>
        </div>

        <div className="sm:flex sm:flex-wrap sm:justify-between">
            {/* Ingredientes */}
            <div className="mt-4 sm:w-1/2 sm:px-2">
            <h3 className="text-lg font-semibold">Ingredients:</h3>
            <ul className="list-disc pl-5 list-inside">
                {recipe.ingredients.map((ingredient: Ingredient, index) => (
                <li key={index} className="relative">
                    <span>{ingredient.name}</span>
                    <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded absolute right-0 top-0"
                    />
                </li>
                ))}
            </ul>
            </div>

            {/* Métodos */}
            <div className="mt-4 sm:w-1/2 sm:px-2">
            <h3 className="text-lg font-semibold">Methods:</h3>
            <ol className="list-decimal pl-5 list-inside">
                {recipe.methods.map((method: Method, index) => (
                <li key={index} className="relative">
                    <span>{method.description}</span>
                    <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded absolute right-0 top-0"
                    />
                </li>
                ))}
            </ol>
            </div>
        </div>

        {/* Comentários */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reviews:</h3>
          {recipe.reviews.length > 0 ? (
            <ul className="list-disc pl-5">
              {recipe.reviews.map((review, index) => (
                <li key={index}>
                  <p className="text-sm text-gray-700">
                    <strong>{review.user.name}:</strong> {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
