package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.dto.review.ReviewCreateDTO;
import com.recipes.flavors.backend.entities.dto.review.ReviewUpdateDTO;
import com.recipes.flavors.backend.services.ReviewService;
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

import java.net.URI;

@RestController
@RequestMapping("/recipes")
@Validated
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/review/{id}")
    public ResponseEntity<Review> findById(@PathVariable Long id) {
        Review obj = this.reviewService.findById(id);

        return ResponseEntity
                .ok()
                .body(obj);
    }

    @PostMapping("/{recipeId}/review")
    public ResponseEntity<String> create(@Validated @RequestBody ReviewCreateDTO obj, @PathVariable Long recipeId) {

        if (obj.getUser() == null) {
            return ResponseEntity.badRequest().body("User cannot be null.");
        }

        if (recipeId == null) {
            return ResponseEntity.badRequest().body("Recipe id cannot be null.");
        }

        Review review = this.reviewService.fromDTO(obj, recipeId);
        Review newReview = this.reviewService.create(review, recipeId);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newReview.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .build();
    }

    @PutMapping("/{recipeId}/review/{id}")
    public ResponseEntity<Void> update(@Validated @RequestBody ReviewUpdateDTO obj, @PathVariable Long id) {

        obj.setId(id);

        Review review = this.reviewService.fromDTO(obj);
        this.reviewService.update(review);

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/{recipeId}/review/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        this.reviewService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
