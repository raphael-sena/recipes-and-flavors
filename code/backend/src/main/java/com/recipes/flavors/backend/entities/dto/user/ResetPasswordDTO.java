package com.recipes.flavors.backend.entities.dto.user;

public record ResetPasswordDTO(String email, String password, String confirmPassword) {
}
