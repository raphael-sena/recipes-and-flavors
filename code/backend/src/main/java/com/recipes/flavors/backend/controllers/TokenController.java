package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.dto.login.LoginRequest;
import com.recipes.flavors.backend.entities.dto.login.LoginResponse;
import com.recipes.flavors.backend.entities.Role;
import com.recipes.flavors.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
public class TokenController {

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        var userOptional = userService.findByEmail(loginRequest.email());

        if (userOptional.isEmpty()) {
            System.out.println("Usuário não encontrado para o email: " + loginRequest.email());
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        var user = userOptional.get();

        if (!bCryptPasswordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        var now = Instant.now();
        var expiresIn = 3600L; // Token válido por 1 hora

        var scopes = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("recipesAndFlavors")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .subject(user.getId().toString())
                .claim("scope", scopes)
                .build();

        var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        System.out.println("Generated JWT: " + token);

        return ResponseEntity.ok(new LoginResponse(user.getEmail(), token, expiresIn));
    }
}