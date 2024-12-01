package com.recipes.flavors.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.Table;

@Table(name = "tb_unity")
public enum UnitEnum {
    GRAMS,
    KILOGRAMS,
    LITERS,
    TABLESPOONS,
    CUPS,
    TEASPOONS,
    UNITS;

    @JsonCreator
    public static UnitEnum fromValue(String value) {
        return UnitEnum.valueOf(value.toUpperCase());
    }
}
