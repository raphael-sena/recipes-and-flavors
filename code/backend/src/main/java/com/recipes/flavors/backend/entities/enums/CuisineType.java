package com.recipes.flavors.backend.entities.enums;

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
    MEXICAN;

    public static List<DietType> getAllDietTypes() {
        return Arrays.asList(DietType.values());
    }
}
