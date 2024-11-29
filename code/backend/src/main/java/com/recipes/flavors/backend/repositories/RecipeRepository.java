package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByUserId(Long userId);
}
