package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Review r WHERE r.id = :id")
    void deleteById(@Param("id") Long id);

    Page<Review> findByRecipeId(Long recipeId, Pageable pageable);
}
