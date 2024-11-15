package com.recipes.flavors.backend.entities.dto.recipe;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecipeCreateDTO {

    private Long userId;
    private String name;
    private List<Ingredient> ingredients;
    private List<Method> methods;
    private byte[] image;
    private Duration preparationTime;
    private Duration cookTime;
    private Integer servings;
    private DietType dietType;
    private CuisineType cuisineType;
    private Difficulty difficulty;
    private Category category;
}