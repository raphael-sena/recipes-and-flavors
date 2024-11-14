package com.recipes.flavors.backend.entities;

import com.recipes.flavors.backend.entities.enums.UnityEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_ingredient")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 60, nullable = false)
    @NotBlank
    private String name;

    @Column(name = "quantity", nullable = false)
    @NotBlank
    private Double quantity;

    @Enumerated(EnumType.STRING)
    private UnityEnum unity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}