package com.recipes.flavors.backend.entities.dto.recipe;

import com.recipes.flavors.backend.entities.dto.ingredient.IngredientDTO;
import com.recipes.flavors.backend.entities.dto.method.MethodDTO;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;

import java.time.Duration;
import java.util.List;

public record RecipeHistoryResponseDTO(
        Long id,
        String userName,
        String name,
        Duration totalTime,
        Integer servings,
        DietType dietType,
        CuisineType cuisineType,
        Difficulty difficulty,
        Category category,
        String image, // Base64 da imagem
        List<IngredientDTO> ingredients, // Lista de ingredientes
        List<MethodDTO> methods // Lista de métodos
) {
}
