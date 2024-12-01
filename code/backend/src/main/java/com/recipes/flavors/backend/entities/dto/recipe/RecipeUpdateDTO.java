package com.recipes.flavors.backend.entities.dto.recipe;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecipeUpdateDTO {
    private Long             id;
    private String           name;
    private List<Ingredient> ingredients;
    private List<Method>     methods;
    private String           image;
    private Duration         preparationTime;
    private Duration         cookTime;
    private Integer          servings;
    private DietType         dietType;
    private CuisineType      cuisineType;
    private Difficulty       difficulty;
    private Category         category;
}
