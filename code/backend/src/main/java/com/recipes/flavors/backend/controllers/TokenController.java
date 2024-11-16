package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.dto.login.LoginRequest;
import com.recipes.flavors.backend.entities.dto.login.LoginResponse;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.entities.Role;
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

    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenController(JwtEncoder jwtEncoder,
                           UserRepository userRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder){
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        var userOptional = userRepository.findByEmail(loginRequest.email());

        if (userOptional.isEmpty()) {
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
                .issuer("dressManager")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .subject(user.getId().toString())
                .claim("scope", scopes)
                .build();

        var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(user.getEmail(), token, expiresIn));
    }
}