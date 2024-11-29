package com.recipes.flavors.backend.entities.dto.recipe;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class RecipeDTO {

    private Long                id;
    private String              name;
    private User                user;
    private List<Ingredient>    ingredients;
    private List<Method>        methods;
    private String              image;
    private Duration            preparationTime;
    private Duration            cookTime;
    private Long                totalTime;
    private Integer             servings;
    private DietType            dietType;
    private CuisineType         cuisineType;
    private Difficulty          difficulty;
    private Category            category;
    private Set<Review>         reviews;
    private boolean             deleted;
}
