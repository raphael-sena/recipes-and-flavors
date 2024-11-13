package com.recipes.flavors.backend.entities;

import com.recipes.flavors.backend.entities.enums.Category;
import com.recipes.flavors.backend.entities.enums.CuisineType;
import com.recipes.flavors.backend.entities.enums.DietType;
import com.recipes.flavors.backend.entities.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "tb_ingredient_recipe",  // Tabela de junção
            joinColumns = @JoinColumn(name = "recipe_id"), // Coluna que representa a entidade 'Recipe' na tabela de junção
            inverseJoinColumns = @JoinColumn(name = "ingredient_id") // Coluna que representa a entidade 'Ingredient' na tabela de junção
    )
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Method> methods;

    @Lob
    private byte[] image;

    private Integer preparationTime;
    private Integer cookTime;
    private Integer totalTime;
    private Integer servings;

    private DietType dietType;
    private CuisineType cuisineType;
    private Difficulty difficulty;
    private Category category;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();
}
