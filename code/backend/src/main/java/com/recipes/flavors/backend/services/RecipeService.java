package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeUpdateDTO;
import com.recipes.flavors.backend.repositories.IngredientRepository;
import com.recipes.flavors.backend.repositories.MethodRepository;
import com.recipes.flavors.backend.repositories.RecipeRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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

    @Transactional
    public Recipe create(Recipe obj) {
        obj.setTotalTime(totalTime(obj.getPreparationTime(), obj.getCookTime()));
        return recipeRepository.save(obj);
    }

    @Transactional
    public Recipe update(Recipe obj) {
        Recipe newObj = findById(obj.getId());
        newObj.setTotalTime(totalTime(obj.getPreparationTime(), obj.getCookTime()));
        return this.recipeRepository.save(newObj);
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

    @Transactional
    public Recipe fromDTO(@Valid RecipeUpdateDTO obj) {

        Optional<Recipe> existingRecipe = recipeRepository.findById(obj.getId());

        Recipe recipe = existingRecipe.get();

        recipe.setName(obj.getName());

        // Update de Ingredients
        // Remover métodos antigos que não foram enviados na requisição
        Set<Long> updatedIngredientsIds = obj.getIngredients().stream()
                .map(Ingredient::getId)
                .collect(Collectors.toSet());

        // Remover os métodos que não estão mais presentes
        recipe.getIngredients()
                .removeIf(ingredient -> !updatedIngredientsIds.contains(ingredient.getId()));

        // Atualiza ou adiciona novos métodos, mas evita substituição da lista inteira
        for (Ingredient ingredientDTO : obj.getIngredients()) {
            Ingredient ingredient = ingredientDTO.getId() != null
                    ? ingredientRepository.findById(ingredientDTO.getId()).orElseGet(Ingredient::new)
                    : new Ingredient();

            ingredient.setName(ingredientDTO.getName());
            ingredient.setUnity(ingredientDTO.getUnity());
            ingredient.setQuantity(ingredientDTO.getQuantity());
            ingredient.setRecipe(recipe);  // Associa o método à receita existente
            ingredientRepository.save(ingredient); // Salva o método atualizado ou novo
        }

        recipe = recipeRepository.save(recipe);

        // Update de Métodos
        // Remover métodos antigos que não foram enviados na requisição
        Set<Long> updatedMethodIds = obj.getMethods().stream()
                .map(Method::getId)
                .collect(Collectors.toSet());

        // Remover os métodos que não estão mais presentes
        recipe.getMethods().removeIf(method -> !updatedMethodIds.contains(method.getId()));

        // Atualiza ou adiciona novos métodos, mas evita substituição da lista inteira
        for (Method methodDTO : obj.getMethods()) {
            Method method = methodDTO.getId() != null
                    ? methodRepository.findById(methodDTO.getId()).orElseGet(Method::new)
                    : new Method();

            method.setDescription(methodDTO.getDescription());
            method.setRecipe(recipe);  // Associa o método à receita existente
            methodRepository.save(method); // Salva o método atualizado ou novo
        }

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