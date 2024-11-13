package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.repositories.RecipeRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.time.Duration;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe findById(Long id) {
        Optional<Recipe> recipe = this.recipeRepository.findById(id);
        return recipe.orElseThrow(() -> new ObjectNotFoundException(
                "Receita não encontrada! Id: " + id + ", Tipo: " + Recipe.class.getName()));
    }

    @Transactional
    public Recipe create(Recipe obj) {

        obj.setId(null);
        obj.setUser(obj.getUser());
        obj.setIngredients(obj.getIngredients());
        obj.setMethods(obj.getMethods());
        obj.setImage(obj.getImage());
        obj.setPreparationTime(obj.getPreparationTime());
        obj.setCookTime(obj.getCookTime());
        obj.setServings(obj.getServings());
        obj.setDietType(obj.getDietType());
        obj.setCuisineType(obj.getCuisineType());
        obj.setDifficulty(obj.getDifficulty());
        obj.setCategory(obj.getCategory());
        obj.setTotalTime(totalTime(obj.getCookTime(), obj.getPreparationTime()));
        obj.setDeleted(obj.isDeleted());

        return obj;
    }

    public Recipe fromDTO(@Valid RecipeCreateDTO obj) {

        Recipe recipe = new Recipe();

        recipe.setUser(obj.getUser());
        recipe.setIngredients(obj.getIngredients());
        recipe.setMethods(obj.getMethods());
        recipe.setImage(obj.getImage());
        recipe.setPreparationTime(obj.getPreparationTime());
        recipe.setCookTime(obj.getCookTime());
        recipe.setServings(obj.getServings());
        recipe.setDietType(obj.getDietType());
        recipe.setCuisineType(obj.getCuisineType());
        recipe.setDifficulty(obj.getDifficulty());
        recipe.setCategory(obj.getCategory());
        recipe.setTotalTime(totalTime(obj.getCookTime(), obj.getPreparationTime()));
        recipe.setDeleted(false);
        return recipe;
    }

    public Duration totalTime(Duration cookTime, Duration preparationTime) {
        return cookTime.plus(preparationTime);
    }


}
