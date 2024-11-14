package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
