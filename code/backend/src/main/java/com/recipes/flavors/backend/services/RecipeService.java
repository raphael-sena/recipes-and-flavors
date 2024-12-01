package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.ingredient.IngredientDTO;
import com.recipes.flavors.backend.entities.dto.method.MethodDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeHistoryRequestDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeHistoryResponseDTO;
import com.recipes.flavors.backend.repositories.IngredientRepository;
import com.recipes.flavors.backend.repositories.MethodRepository;
import com.recipes.flavors.backend.repositories.RecipeRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import com.recipes.flavors.backend.specifications.RecipeSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.Duration;
import java.util.Base64;
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
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public Recipe findById(Long id) {
        Optional<Recipe> recipe = this.recipeRepository.findById(id);
        return recipe.orElseThrow(() -> new ObjectNotFoundException(
                "Receita não encontrada! Id: " + id + ", Tipo: " + Recipe.class.getName()));
    }

    @Transactional
    public List<Recipe> findAll(int offset, int limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        return recipeRepository.findAll(pageable).getContent();
    }

    @Transactional
    public List<Recipe> findRecipesByUserId(Long userId, int offset, int limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        return recipeRepository.findByUserId(userId, pageable).getContent();
    }

    @Transactional
    public List<Recipe> findDeletedRecipesByUserId(Long userId, int offset, int limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        return recipeRepository.findDeletedByUserId(userId, pageable).getContent();
    }

    @Transactional
    public Page<RecipeHistoryResponseDTO> getHistory(RecipeHistoryRequestDTO requestDTO, Pageable pageable) {
        Specification<Recipe> spec = Specification.where(RecipeSpecifications.hasUserNames(requestDTO.userName()))
                .and(RecipeSpecifications.hasRecipeName(requestDTO.name()))
                .and(RecipeSpecifications.hasTotalTime(requestDTO.totalTime()))
                .and(RecipeSpecifications.hasServings(requestDTO.servings()))
                .and(RecipeSpecifications.hasDietType(requestDTO.dietType()))
                .and(RecipeSpecifications.hasCuisineType(requestDTO.cuisineType()))
                .and(RecipeSpecifications.hasDifficulty(requestDTO.difficulty()))
                .and(RecipeSpecifications.hasCategory(requestDTO.category()));

        // Carrega as receitas com todas as relações necessárias
        Page<Recipe> recipePage = recipeRepository.findAll(spec, pageable);

        return recipePage.map(this::toRecipeHistoryResponseDTO);
    }


    @Transactional
    public Recipe create(Recipe obj) {
        obj.setTotalTime(totalTime(obj.getPreparationTime(), obj.getCookTime()));
        return recipeRepository.save(obj);
    }

    @Transactional
    public Recipe update(Recipe obj, Long userId) {

        String authenticatedUserId = SecurityContextHolder.getContext().getAuthentication().getName();

        Recipe newObj = findById(obj.getId());

        if (!newObj.getUser().getId().toString().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You do not have permission to edit this recipe.");
        }

        newObj.setTotalTime(totalTime(obj.getPreparationTime(), obj.getCookTime()));
        return this.recipeRepository.save(newObj);
    }

    public void delete(Long id) {
        Recipe recipe = findById(id);
        recipe.setDeleted(true);
        this.recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe fromDTO(@Valid RecipeCreateDTO obj) {

        Recipe recipe = new Recipe();
        Recipe finalRecipe = recipe;

        System.out.println("Usuário antes de decodificar: " + obj.getUserId());

        Long userId = userService.extractUserIdFromJWT(String.valueOf(obj.getUserId()));
        User user = userService.findById(userId);

        recipe.setUser(user);

        recipe.setName(obj.getName());
        if (obj.getImage() != null) {
            recipe.setImage(Base64.getDecoder().decode(obj.getImage()));
        }
        recipe.setPreparationTime(obj.getPreparationTime());
        recipe.setCookTime(obj.getCookTime());
        recipe.setServings(obj.getServings());
        recipe.setDietType(obj.getDietType());
        recipe.setCuisineType(obj.getCuisineType());
        recipe.setDifficulty(obj.getDifficulty());
        recipe.setCategory(obj.getCategory());

        // Salva a nova receita antes de salvar os ingredientes
        recipe = recipeRepository.save(recipe);

        // Salva os ingredientes
        List<Ingredient> ingredients = obj.getIngredients().stream()
                .map(ingredient -> {
                    Ingredient newIngredient = new Ingredient();
                    newIngredient.setName(ingredient.getName());
                    newIngredient.setQuantity(ingredient.getQuantity());
                    newIngredient.setUnit(ingredient.getUnit());
                    newIngredient.setRecipe(finalRecipe);
                    return ingredientRepository.save(newIngredient);  // Salva e retorna o ingrediente
                })
                .collect(Collectors.toList());
        recipe.setIngredients(ingredients);

        // Salva os métodos
        List<Method> methods = obj.getMethods().stream()
                .map(method -> {
                    Method newMethod = new Method();
                    newMethod.setDescription(method.getDescription());
                    newMethod.setRecipe(finalRecipe);  // Associar o método à receita salva
                    return methodRepository.save(newMethod);  // Salva o método
                })
                .collect(Collectors.toList());
        recipe.setMethods(methods);

        return recipe;
    }

    @Transactional
    public Recipe fromDTO(@Valid RecipeDTO obj) {

        Optional<Recipe> existingRecipe = recipeRepository.findById(obj.getId());

        Recipe recipe = existingRecipe.get();

        recipe.setName(obj.getName());

        // Update de Ingredients
        Set<Long> updatedIngredientsIds = obj.getIngredients().stream()
                .map(Ingredient::getId)
                .collect(Collectors.toSet());

        recipe.getIngredients()
                .removeIf(ingredient -> !updatedIngredientsIds.contains(ingredient.getId()));

        for (Ingredient ingredientDTO : obj.getIngredients()) {
            Ingredient ingredient = ingredientDTO.getId() != null
                    ? ingredientRepository.findById(ingredientDTO.getId()).orElseGet(Ingredient::new)
                    : new Ingredient();

            ingredient.setName(ingredientDTO.getName());
            ingredient.setUnit(ingredientDTO.getUnit());
            ingredient.setQuantity(ingredientDTO.getQuantity());
            ingredient.setRecipe(recipe);  // Associa o método à receita existente
            ingredientRepository.save(ingredient); // Salva o método atualizado ou novo
        }

        recipe = recipeRepository.save(recipe);

        // Update de Métodos
        Set<Long> updatedMethodIds = obj.getMethods().stream()
                .map(Method::getId)
                .collect(Collectors.toSet());

        recipe.getMethods().removeIf(method -> !updatedMethodIds.contains(method.getId()));

        for (Method methodDTO : obj.getMethods()) {
            Method method = methodDTO.getId() != null
                    ? methodRepository.findById(methodDTO.getId()).orElseGet(Method::new)
                    : new Method();

            method.setDescription(methodDTO.getDescription());
            method.setRecipe(recipe);
            methodRepository.save(method);
        }

        if (obj.getImage() != null) {
            recipe.setImage(Base64.getDecoder().decode(obj.getImage()));
        }
        recipe.setPreparationTime(obj.getPreparationTime());
        recipe.setCookTime(obj.getCookTime());
        recipe.setServings(obj.getServings());
        recipe.setDietType(obj.getDietType());
        recipe.setCuisineType(obj.getCuisineType());
        recipe.setDifficulty(obj.getDifficulty());
        recipe.setCategory(obj.getCategory());

        return recipe;
    }

    public Duration  totalTime(Duration  cookTime, Duration preparationTime) {
        return cookTime.plus(preparationTime);
    }

    @Transactional
    public void saveImage(Long id, MultipartFile file) throws IOException {
        Recipe recipe = findById(id);
        recipe.setImage(file.getBytes());
        recipeRepository.save(recipe);
    }

    @Transactional
    public byte[] retrieveImage(Long id) {
        Recipe recipe = findById(id);
        return recipe.getImage();
    }

    public Long countRecipesByUserId(Long userId) {
        return recipeRepository.countByUserId(userId);
    }

    public Long countRecipes() {
        return recipeRepository.countRecipes();
    }

    private RecipeHistoryResponseDTO toRecipeHistoryResponseDTO(Recipe recipe) {
        return new RecipeHistoryResponseDTO(
                recipe.getId(),
                recipe.getUser().getName(),
                recipe.getName(),
                recipe.getTotalTime(),
                recipe.getServings(),
                recipe.getDietType(),
                recipe.getCuisineType(),
                recipe.getDifficulty(),
                recipe.getCategory(),
                Base64.getEncoder().encodeToString(recipe.getImage()), // Converter imagem para Base64
                recipe.getIngredients().stream()
                        .map(ingredient -> new IngredientDTO(ingredient.getName(), ingredient.getQuantity(), ingredient.getUnit()))
                        .collect(Collectors.toList()),
                recipe.getMethods().stream()
                        .map(method -> new MethodDTO(method.getDescription()))
                        .collect(Collectors.toList())
        );
    }

}