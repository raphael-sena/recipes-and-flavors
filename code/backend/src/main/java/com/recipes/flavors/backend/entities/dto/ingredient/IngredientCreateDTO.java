package com.recipes.flavors.backend.entities.dto.ingredient;

import com.recipes.flavors.backend.entities.enums.UnitEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class IngredientCreateDTO {

    @NotBlank
    private String name;

    @NotBlank
    private Double quantity;

    private UnitEnum unity;
}
