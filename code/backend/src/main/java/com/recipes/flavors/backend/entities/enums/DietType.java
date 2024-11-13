package com.recipes.flavors.backend.entities.enums;

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
}
