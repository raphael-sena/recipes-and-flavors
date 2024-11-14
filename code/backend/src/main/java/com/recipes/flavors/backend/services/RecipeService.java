package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.repositories.IngredientRepository;
import com.recipes.flavors.backend.repositories.MethodRepository;
import com.recipes.flavors.backend.repositories.RecipeRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private MethodRepository methodRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private UserRepository userRepository;

    public Recipe findById(Long id) {
        Optional<Recipe> recipe = this.recipeRepository.findById(id);
        return recipe.orElseThrow(() -> new ObjectNotFoundException(
                "Receita não encontrada! Id: " + id + ", Tipo: " + Recipe.class.getName()));
    }

//    @Transactional
//    public Recipe create(Recipe obj) {
//
//        obj.setId(null);
//        obj.setName(obj.getName());
//        obj.setUser(obj.getUser());
//        obj.setIngredients(obj.getIngredients());
//        obj.setMethods(obj.getMethods());
//        obj.setImage(obj.getImage());
//        obj.setPreparationTime(obj.getPreparationTime());
//        obj.setCookTime(obj.getCookTime());
//        obj.setServings(obj.getServings());
//        obj.setDietType(obj.getDietType());
//        obj.setCuisineType(obj.getCuisineType());
//        obj.setDifficulty(obj.getDifficulty());
//        obj.setCategory(obj.getCategory());
//        obj.setTotalTime(totalTime(obj.getCookTime(), obj.getPreparationTime()));
//        obj.setDeleted(obj.isDeleted());
//
//        return recipeRepository.save(obj);
//    }

    @Transactional
    public Recipe create(Recipe obj) {
        obj.setTotalTime(totalTime(obj.getPreparationTime(), obj.getCookTime()));
        return recipeRepository.save(obj);
    }

    @Transactional
    public Recipe fromDTO(@Valid RecipeCreateDTO obj) {

        Recipe recipe = new Recipe();

        Optional<User> user = userRepository.findById(obj.getUserId());

        recipe.setUser(user.get());
        recipe.setName(obj.getName());

        List<Ingredient> ingredients = obj.getIngredients().stream()
                .map(ingredient -> {
                    Ingredient newIngredient = new Ingredient();
                    newIngredient.setName(ingredient.getName());
                    newIngredient.setQuantity(ingredient.getQuantity());
                    newIngredient.setUnity(ingredient.getUnity());
                    return ingredientRepository.save(newIngredient);  // Salva e retorna o ingrediente
                })
                .collect(Collectors.toList());
        recipe.setIngredients(ingredients);

        recipe = recipeRepository.save(recipe);

        Recipe finalRecipe = recipe;
        List<Method> methods = obj.getMethods().stream()
                .map(method -> {
                    Method newMethod = new Method();
                    newMethod.setDescription(method.getDescription());
                    newMethod.setRecipe(finalRecipe);  // Associar o método à receita salva
                    return methodRepository.save(newMethod);  // Salva o método
                })
                .collect(Collectors.toList());

        recipe.setMethods(methods);

        recipe.setImage(obj.getImage());
        recipe.setPreparationTime(obj.getPreparationTime().toMinutes());
        recipe.setCookTime(obj.getCookTime().toMinutes());
        recipe.setServings(obj.getServings());
        recipe.setDietType(obj.getDietType());
        recipe.setCuisineType(obj.getCuisineType());
        recipe.setDifficulty(obj.getDifficulty());
        recipe.setCategory(obj.getCategory());

        return recipe;
    }

    public Long totalTime(Long cookTime, Long preparationTime) {
        return cookTime+preparationTime;
    }
}