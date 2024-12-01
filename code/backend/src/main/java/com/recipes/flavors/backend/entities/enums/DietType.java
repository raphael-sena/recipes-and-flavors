package com.recipes.flavors.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;
import java.util.List;

public enum DietType {
    VEGETARIAN,
    VEGAN,
    CARNIVORE,
    LOW_CARB,
    KETO,
    MEDITERRANEAN,
    GLUTEN_FREE,
    LACTOSE_FREE;

    public static List<CuisineType> getAllCuisines() {
        return Arrays.asList(CuisineType.values());
    }

    @JsonCreator
    public static DietType fromValue(String value) {
        return DietType.valueOf(value.toUpperCase());
    }
}
