package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor {

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND r.deleted = false")
    Page<Recipe> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Recipe r WHERE r.user.id = :userId AND r.deleted = false")
    Long countByUserId(Long userId);

    @Query("SELECT r FROM Recipe r WHERE r.deleted = false")
    Page<Recipe> findAllActive(Pageable pageable);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND r.deleted = true")
    Page<Recipe> findDeletedByUserId(Long userId, Pageable pageable);

    @Query("SELECT r FROM Recipe r WHERE r.user.id = :userId AND r.deleted = false")
    Page<Recipe> findAll(Long userId, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Recipe r WHERE r.deleted = false")
    Long countRecipes();
}
