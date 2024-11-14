package com.recipes.flavors.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tb_recipe")
@AllArgsConstructor
@NoArgsConstructor
@Data
@SQLDelete(sql = "UPDATE tb_recipe SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotNull(message = "Name cannot be null.")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"email", "recipes"})
    private User user;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "recipe", cascade = CascadeType.ALL)
    @Cascade({
            org.hibernate.annotations.CascadeType.DELETE_ORPHAN
    })
    @JsonIgnoreProperties({"recipe"})
    private List<Ingredient> ingredients;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "recipe", cascade = CascadeType.ALL)
    @Cascade({
            org.hibernate.annotations.CascadeType.DELETE_ORPHAN
    })
    @JsonIgnoreProperties({"recipe"})
    private List<Method> methods;

    @Lob
    @Column(unique = true)
    private byte[] image;

    @Column(name = "preparationTime")
    private Long preparationTime;

    @Column(name = "cookTime")
    private Long cookTime;

    @Column(name = "totalTime")
    private Long totalTime;

    @Column(name = "servings")
    private Integer servings;

    @Enumerated(EnumType.STRING)
    private DietType dietType;

    @Enumerated(EnumType.STRING)
    private CuisineType cuisineType;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    private boolean deleted = Boolean.FALSE;
}