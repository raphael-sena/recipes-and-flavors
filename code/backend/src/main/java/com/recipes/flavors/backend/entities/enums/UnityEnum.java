package com.recipes.flavors.backend.entities.enums;

import jakarta.persistence.Table;

@Table(name = "tb_unity")
public enum UnityEnum {
    GRAMS,
    KILOGRAMS,
    LITRE,
    TABLESPOON,
    CUP,
    TEASPOON
}
