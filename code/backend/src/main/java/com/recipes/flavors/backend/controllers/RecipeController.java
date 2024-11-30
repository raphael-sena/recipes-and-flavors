package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeDTO;
import com.recipes.flavors.backend.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipe")
@Validated
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> findById(@PathVariable Long id) {
        Recipe obj = this.recipeService.findById(id);

        return ResponseEntity
                .ok()
                .body(obj);
    }

    @GetMapping("/my-recipes")
    public ResponseEntity<Map<String, Object>> getMyRecipes(@RequestParam(defaultValue = "0") int offset,
                                                            @RequestParam(defaultValue = "10") int limit) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        Jwt jwt = (Jwt) authentication.getPrincipal();
        Long userId = Long.valueOf(jwt.getClaimAsString("sub"));

        List<Recipe> recipes = recipeService.findRecipesByUserId(userId, offset, limit);

        Long totalCount = recipeService.countRecipesByUserId(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", recipes);
        response.put("totalCount", totalCount);

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("permitAll()")
    @PostMapping
    public ResponseEntity<Recipe>create(@Valid @RequestBody RecipeCreateDTO obj) {

        Recipe recipe = this.recipeService.fromDTO(obj);
        Recipe newRecipe = this.recipeService.create(recipe);

        System.out.println("Saved Recipe ID: " + newRecipe.getId());

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newRecipe.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(newRecipe);
    }

    @PreAuthorize("#obj.user == authentication.principal.id")
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody RecipeDTO obj,
                                       @PathVariable Long id,
                                       Authentication authentication) {

        System.out.println("Usuário autenticado: " + authentication.getName());
        System.out.println("Permissões: " + authentication.getAuthorities());

        obj.setId(id);

        Recipe recipe = this.recipeService.fromDTO(obj);
        this.recipeService.update(recipe, obj.getId());

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.recipeService.delete(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long id,
                                         @RequestParam("image") MultipartFile file) {
        try {
            System.out.println("Recebendo imagem: " + file.getOriginalFilename());
            System.out.println("Tamanho do arquivo: " + file.getSize());

            recipeService.saveImage(id, file);
            return ResponseEntity
                    .ok()
                    .body("Image saved successfully!");
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving the image.");
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        byte[] image = recipeService.retrieveImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }
}