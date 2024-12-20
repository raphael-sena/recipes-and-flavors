package com.recipes.flavors.backend.entities.dto.review;

import com.recipes.flavors.backend.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewCreateDTO {

    private String comment;

    @NotNull(message = "User cannot be null")
    private Long userId;

    @NotNull(message = "Rating cannot be null")
    private Integer rating;
}
