package com.recipes.flavors.backend.entities.dto.recipe;

import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;

import java.time.Duration;

public record RecipeHistoryRequestDTO(
        String[] userName,
        String name,
        Duration totalTime,
        Integer servings,
        DietType dietType,
        CuisineType cuisineType,
        Difficulty difficulty,
        Category category
) {
}
