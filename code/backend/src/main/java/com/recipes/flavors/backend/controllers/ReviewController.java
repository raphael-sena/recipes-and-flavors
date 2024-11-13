package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.dto.ReviewCreateDTO;
import com.recipes.flavors.backend.entities.dto.ReviewUpdateDTO;
import com.recipes.flavors.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/review")
@Validated
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{id}")
    public ResponseEntity<Review> findById(@PathVariable Long id) {
        Review obj = this.reviewService.findById(id);

        return ResponseEntity
                .ok()
                .body(obj);
    }

    @PostMapping
    public ResponseEntity<String> create(@Validated @RequestBody ReviewCreateDTO obj) {

        if (obj.getUser() == null) {
            return ResponseEntity.badRequest().body("User cannot be null.");
        }

        Review review = this.reviewService.fromDTO(obj);
        Review newReview = this.reviewService.create(review);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newReview.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Validated @RequestBody ReviewUpdateDTO obj, @PathVariable Long id) {

        obj.setId(id);

        Review review = this.reviewService.fromDTO(obj);
        this.reviewService.update(review);

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        this.reviewService.delete(id);
        return ResponseEntity
                .noContent()
                .build();
    }
}
