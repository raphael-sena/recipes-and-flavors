package com.recipes.flavors.backend.entities.dto.login;

public record LoginResponse(String email, String accessToken, Long expiresIn) {
}
