package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.dto.review.ReviewCreateDTO;
import com.recipes.flavors.backend.entities.dto.review.ReviewResponseDTO;
import com.recipes.flavors.backend.entities.dto.review.ReviewUpdateDTO;
import com.recipes.flavors.backend.entities.dto.review.ReviewUserDTO;
import com.recipes.flavors.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/{recipeId}/review")
    public ResponseEntity<Page<ReviewResponseDTO>> getReviewsByRecipe(
            @PathVariable Long recipeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Review> reviews = reviewService.findByRecipeId(recipeId, PageRequest.of(page, size));

        Page<ReviewResponseDTO> response = reviews.map(review ->
                new ReviewResponseDTO(
                        review.getId(),
                        review.getComment(),
                        review.getRating(),
                        new ReviewUserDTO(review.getUser().getId(), review.getUser().getName())
                )
        );

        return ResponseEntity.ok(response);
    }


    @PostMapping("/{recipeId}/review")
    public ResponseEntity<ReviewResponseDTO> create(@Validated @RequestBody ReviewCreateDTO obj, @PathVariable Long recipeId) {

        System.out.println("Received DTO" + obj.toString());

        if (obj.getUserId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        if (recipeId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Review review = this.reviewService.fromDTO(obj, recipeId);
        Review newReview = this.reviewService.create(review, recipeId);
        ReviewResponseDTO responseDTO = new ReviewResponseDTO(
                newReview.getId(),
                newReview.getComment(),
                newReview.getRating(),
                new ReviewUserDTO(newReview.getUser().getId(), newReview.getUser().getName())
        );

        System.out.println("Response DTO : " + responseDTO.toString());

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newReview.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(responseDTO);
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
    public ResponseEntity<Void> delete(@PathVariable Long recipeId, @PathVariable Long id) {
        System.out.println("Recebida requisição para excluir review com ID " + recipeId + " da receita " + id);

        this.reviewService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
