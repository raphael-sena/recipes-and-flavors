package com.recipes.flavors.backend.entities.enums;

import jakarta.persistence.Table;

@Table(name = "tb_unity")
public enum UnitEnum {
    GRAMS,
    KILOGRAMS,
    LITRE,
    TABLESPOON,
    CUP,
    TEASPOON,
    UNITS
}
