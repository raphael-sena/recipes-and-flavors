package com.recipes.flavors.backend.entities.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Category {
    APPETIZER,
    MAIN_COURSE,
    DESSERT,
    BEVERAGE;

    @JsonCreator
    public static Category fromValue(String value) {
        return Category.valueOf(value.toUpperCase());
    }
}


