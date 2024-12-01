package com.recipes.flavors.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_review")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(exclude = {"user", "recipe"})
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @JsonIgnoreProperties({"recipes", "name", "email", "password", "reviews", "roles"})
    private User user;

    @Column(name = "rating")
    @NotNull
    private Integer rating;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    @JsonIgnoreProperties({"ingredients", "methods", "image", "preparationTime", "cookTime", "totalTime", "servings", "dietType", "cuisineType", "difficulty", "category", "reviews", "deleted"})
    private Recipe recipe;
}
