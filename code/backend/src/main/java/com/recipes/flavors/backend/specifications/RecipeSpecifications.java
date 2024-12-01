package com.recipes.flavors.backend.specifications;

import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.time.Duration;
import java.util.Arrays;

public class RecipeSpecifications {

    public static Specification<Recipe> hasUserNames(String[] names) {
        return (root, query, cb) -> {
            if (names == null || names.length == 0) return null;

            root.fetch("user", JoinType.LEFT);
            query.distinct(true);

            return root.get("user").get("name").in(Arrays.asList(names));
        };
    }

    public static Specification<Recipe> hasRecipeName(String recipeName) {
        return (root, query, cb) -> {
            if (recipeName == null || recipeName.trim().isEmpty()) return null;
            return cb.like(cb.lower(root.get("name")), "%" + recipeName.toLowerCase() + "%");
        };
    }

    public static Specification<Recipe> hasTotalTime(Duration totalTime) {
        return (root, query, cb) -> {
            if (totalTime == null) return null;
            return cb.lessThanOrEqualTo(root.get("totalTime"), totalTime);
        };
    }

    public static Specification<Recipe> hasServings(Integer servings) {
        return (root, query, cb) -> {
            if (servings == null) return null;
            return cb.equal(root.get("servings"), servings);
        };
    }

    public static Specification<Recipe> hasDietType(DietType dietType) {
        return (root, query, cb) -> {
            if (dietType == null) return null;
            return cb.equal(root.get("dietType"), dietType);
        };
    }

    public static Specification<Recipe> hasCuisineType(CuisineType cuisineType) {
        return (root, query, cb) -> {
            if (cuisineType == null) return null;
            return cb.equal(root.get("cuisineType"), cuisineType);
        };
    }

    public static Specification<Recipe> hasDifficulty(Difficulty difficulty) {
        return (root, query, cb) -> {
            if (difficulty == null) return null;
            return cb.equal(root.get("difficulty"), difficulty);
        };
    }

    public static Specification<Recipe> hasCategory(Category category) {
        return (root, query, cb) -> {
            if (category == null) return null;
            return cb.equal(root.get("category"), category);
        };
    }
}