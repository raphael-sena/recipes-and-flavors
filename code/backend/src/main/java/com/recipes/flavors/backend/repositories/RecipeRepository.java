package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
