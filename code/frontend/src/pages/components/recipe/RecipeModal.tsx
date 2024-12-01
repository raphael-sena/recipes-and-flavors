import React, { useEffect, useState } from "react";
import { Recipe } from "@/models/Recipe";
import { Ingredient } from "@/models/Ingredient";
import { Method } from "@/models/Method";
import { IoMdClose } from "react-icons/io";
import { formatDuration } from "@/services/TimeService";
import { IoPencil } from "react-icons/io5";
import Link from "next/link";
import { Review } from "@/models/Review";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RecipeHistoryItem } from "@/models/RecipeHistory";

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const getAuthenticatedUser = () => {
  const token = localStorage.getItem("authtoken");

  if (!token) {
    console.error("Token não encontrado no localStorage.");
    return null;
  }

  try {
    // Dividir o token em suas três partes (header, payload, signature)
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));

    if (decodedPayload && decodedPayload.id) {
      return {
        id: decodedPayload.id,
        name: decodedPayload.name,
      };
    } else {
      console.error("Dados do usuário (id) não encontrados no payload.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return null;
  }
};

export const getBase64Image = (base64: string) => {
  const imageBase64 = `data:image/png;base64,${base64}`;
  return imageBase64;
};

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(recipe);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(recipe?.reviews || []);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (recipe) {
      setCurrentRecipe(recipe);
      setReviews(recipe.reviews || []);
      setPage(0);
      loadReviews(0);
      console.log("Recebendo reviews do backend:", reviews);
    }
  }, [recipe]);

  const loadReviews = async (pageNumber: number) => {
    if (!currentRecipe) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        console.error("Token de autenticação não encontrado");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/recipes/${currentRecipe.id}/review?page=${pageNumber}&size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar reviews");
      }

      const data = await response.json(); // Pega a página de reviews
      setReviews((prevReviews) => [...prevReviews, ...data.content]);
      setHasMore(!data.last); // Define se há mais páginas
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadReviews(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleAddReview = async () => {
    if (!newReview.trim() || rating < 1 || rating > 5) return;

    const user = getAuthenticatedUser();
    console.log("Usuário autenticado:", user);

    if (!user) {
      console.error("Usuário não autenticado ou id não encontrado");
      return;
    }

    if (!currentRecipe) {
      console.error("Receita não encontrada");
      return;
    }

    const reviewDTO = {
      comment: newReview,
      userId: user.id,
      rating,
      userName: user.name,
    };

    console.log("Review DTO:", reviewDTO);

    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        console.error("Token de autenticação não encontrado");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/recipes/${currentRecipe.id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewDTO),
        }
      );

      console.log("Response Status:", response.status);
      const responseBody = await response.json();  // Use .text() primeiro para ver a resposta bruta
      console.log("Response Body:", responseBody);

      if (!response.ok) {
        throw new Error("Erro ao adicionar a review");
      }

      // Adicionar a review localmente
      const updatedRecipe = {
        ...currentRecipe,
        reviews: [
          ...currentRecipe.reviews,
          responseBody],
      };

      console.log("Review adicionada:", responseBody);
      console.log("Reviews locais:", updatedRecipe.reviews);

      setCurrentRecipe(updatedRecipe);
      setReviews(updatedRecipe.reviews);
      setNewReview("");
      setRating(0);

      console.log("Review adicionada com sucesso");
    } catch (error) {
      console.error("Erro ao enviar a review:", error);
    }
  };

  const handleEditReview = (reviewId: number, reviewText: string) => {
    setEditingReviewId(reviewId);
    setEditedReviewText(reviewText);
  };

  // Edit Review Method
  const handleSaveEditedReview = async (reviewId: number) => {
    if (!editedReviewText.trim()) return;

    const user = getAuthenticatedUser();
    if (!user || !currentRecipe) return;

    const updatedReview = {
      ...reviews.find((review) => review.id === reviewId),
      comment: editedReviewText,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${currentRecipe.id}/review/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: JSON.stringify(updatedReview),
        }
      );

      if (!response.ok) throw new Error("Erro ao editar a review");

      const updatedRecipe = {
        ...currentRecipe,
        reviews: currentRecipe.reviews.map((review) =>
          review.id === reviewId
            ? { ...review, comment: editedReviewText }
            : review
        ),
      };

      setCurrentRecipe(updatedRecipe);
      setReviews(updatedRecipe.reviews);
      setEditingReviewId(null);
      setEditedReviewText("");
    } catch (error) {
      console.error("Erro ao salvar a edição:", error);
    }
  };

  // Delete Review Method
  const handleDeleteReview = async (reviewId: number) => {
    const token = localStorage.getItem("authtoken");
      if (!token) {
        console.error("Token de autenticação não encontrado");
        return;
      }

    if (!token || !currentRecipe) return;

    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${currentRecipe.id}/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      console.log("Response do Delete: ", response.status, await response.text());

      if (!response.ok) throw new Error("Erro ao excluir a review");

      const updatedRecipe = {
        ...currentRecipe,
        reviews: currentRecipe.reviews.filter(
          (review) => review.id !== reviewId
        ),
      };

      setCurrentRecipe(updatedRecipe);
      setReviews(updatedRecipe.reviews);
    } catch (error) {
      console.error("Erro ao excluir a review:", error);
    }
  };

  const normalizedReviews = reviews.map((review) => ({
    ...review,
    user: {
      ...review.user,
      name: review.user.name || review.recipe?.user?.name || "Usuário desconhecido",
    },
  }));

  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-5">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        {/* Título */}
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{recipe.name}</h2>
              {!recipe.deleted && (
                <Link
                  href={{
                    pathname: "/my-recipes/" + recipe.id + "/edit",
                  }}
                >
                  <div className="relative group">
                    <IoPencil />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Edit
                    </span>
                  </div>
                </Link>
              )}
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
            <p className="text-sm text-gray-600">Category: {recipe.category}</p>
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
              {recipe.ingredients.map((ingredient, index) => (
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
              {recipe.methods.map((method, index) => (
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
          {reviews.length > 0 ? (
            <ul className="list-disc pl-5">
            {normalizedReviews.map((review, index) => (
              <li
                key={index}
                className="w-full flex items-center justify-between"
              >
                <p className="text-sm text-gray-700">
                  <strong>
                    {review.user?.name || "Usuário desconhecido"}:
                  </strong>{" "}
                  {review.comment}{" "}
                  <span className="text-yellow-500">({review.rating}/5)</span>
                </p>
                {getAuthenticatedUser()?.id === review.user?.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEditReview(review.id, review.comment)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {editingReviewId === review.id && (
                  <div className="">
                  <textarea
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  <label className="text-sm">Rating:</label>
                  <div className="flex items-center ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`cursor-pointer text-2xl ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSaveEditedReview(review.id)}
                    className="mt-2 px-4 py-2 bg-black text-white rounded"
                  >
                    Save
                  </button>
                </div>
                )}
              </li>
            ))}
          </ul>
          
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
          {/* Formulário para adicionar review */}
          <div className="mt-4">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Add your review here..."
            ></textarea>
            <div className="flex gap-2">
              <div className="mt-2">
                <label className="text-sm">Rating:</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="ml-2 p-1 border border-gray-300 rounded w-16"
                  min="1"
                  max="5"
                />
              </div>
              <button
                onClick={handleAddReview}
                className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
