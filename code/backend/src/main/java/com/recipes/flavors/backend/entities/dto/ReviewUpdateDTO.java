package com.recipes.flavors.backend.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewUpdateDTO {
    private Long id;
    private String comment;
    private Integer rating;
}
