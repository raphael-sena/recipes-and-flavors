package com.recipes.flavors.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

@Service
public class ImageService {

    @Transactional
    public String convertImageToBase64(String imagePath) {
        try {
            Path path = Path.of(imagePath);
            byte[] imageBytes = Files.readAllBytes(path);
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao converter imagem para Base64", e);
        }
    }
}
