package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeCreateDTO;
import com.recipes.flavors.backend.entities.dto.recipe.RecipeUpdateDTO;
import com.recipes.flavors.backend.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

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

    @PreAuthorize("permitAll()")
    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody RecipeCreateDTO obj) {

        Recipe recipe = this.recipeService.fromDTO(obj);
        Recipe newRecipe = this.recipeService.create(recipe);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newRecipe.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody RecipeUpdateDTO obj, @PathVariable Long id) {
        obj.setId(id);

        Recipe recipe = this.recipeService.fromDTO(obj);
        this.recipeService.update(recipe);

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
}