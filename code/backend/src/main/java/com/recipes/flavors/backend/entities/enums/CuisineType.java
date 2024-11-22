package com.recipes.flavors.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;
import java.util.List;

import static java.util.Arrays.stream;

public enum CuisineType {
    ITALIAN,
    BRAZILIAN,
    CHINESE,
    INDIAN,
    JAPANESE,
    GERMAN,
    THAI,
    MEXICAN,
    FRENCH,
    USA;

    public static List<DietType> getAllDietTypes() {
        return Arrays.asList(DietType.values());
    }

    @JsonCreator
    public static CuisineType fromValue(String value) {
        return CuisineType.valueOf(value.toUpperCase());
    }
}
