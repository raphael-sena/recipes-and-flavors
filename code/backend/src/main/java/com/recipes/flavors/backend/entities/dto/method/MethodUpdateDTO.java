package com.recipes.flavors.backend.entities.dto.method;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MethodUpdateDTO {
    private Long id;
    private String description;
}
