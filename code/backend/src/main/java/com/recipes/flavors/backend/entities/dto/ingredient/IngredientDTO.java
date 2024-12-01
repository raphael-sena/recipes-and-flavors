package com.recipes.flavors.backend.entities.dto.ingredient;

import com.recipes.flavors.backend.entities.enums.UnitEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public record IngredientDTO(String name,
                            Double quantity,
                            UnitEnum unit) {
}
