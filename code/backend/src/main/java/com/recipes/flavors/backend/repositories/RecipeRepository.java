package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    Page<Recipe> findByUserId(Long userId, Pageable pageable);

    Long countByUserId(Long userId);
}
