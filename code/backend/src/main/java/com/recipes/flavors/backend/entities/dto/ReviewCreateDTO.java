package com.recipes.flavors.backend.entities.dto;

import com.recipes.flavors.backend.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewCreateDTO {
    private Long id;
    private String comment;

    @NotNull(message = "User cannot be null")
    private User user;

    @NotNull(message = "Rating cannot be null")
    private Integer rating;
}
