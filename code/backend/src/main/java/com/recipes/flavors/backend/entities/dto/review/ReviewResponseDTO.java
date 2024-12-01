package com.recipes.flavors.backend.entities.dto.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ReviewResponseDTO {
    private Long id;
    private String comment;
    private Integer rating;
    private ReviewUserDTO user;
}