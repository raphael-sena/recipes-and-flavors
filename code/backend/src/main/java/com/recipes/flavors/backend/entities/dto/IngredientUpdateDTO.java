package com.recipes.flavors.backend.entities.dto;

import com.recipes.flavors.backend.entities.enums.UnityEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class IngredientUpdateDTO {
    private Long id;
    private String name;
    private Double quantity;
    private UnityEnum unity;
}
