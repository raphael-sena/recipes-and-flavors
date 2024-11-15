package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.dto.ingredient.IngredientCreateDTO;
import com.recipes.flavors.backend.entities.dto.ingredient.IngredientUpdateDTO;
import com.recipes.flavors.backend.services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/ingredient")
@Validated
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> findById(@PathVariable Long id) {
        Ingredient obj = this.ingredientService.findById(id);
        return ResponseEntity
                .ok()
                .body(obj);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody IngredientCreateDTO obj) {

        Ingredient ingredient = this.ingredientService.fromDTO(obj);
        Ingredient newIngredient = this.ingredientService.create(ingredient);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newIngredient.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody IngredientUpdateDTO obj, @PathVariable Long id) {
        obj.setId(id);
        Ingredient ingredient = this.ingredientService.fromDTO(obj);
        this.ingredientService.update(ingredient);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.ingredientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
