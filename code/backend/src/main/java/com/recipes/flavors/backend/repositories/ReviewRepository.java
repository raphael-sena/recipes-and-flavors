package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
