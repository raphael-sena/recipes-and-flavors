package com.recipes.flavors.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Difficulty {
    EASY,
    MEDIUM,
    HARD;

    @JsonCreator
    public static Difficulty fromValue(String value) {
        return Difficulty.valueOf(value.toUpperCase());
    }
}
