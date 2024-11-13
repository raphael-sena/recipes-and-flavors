package com.recipes.flavors.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_method")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Method {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    @Size(min = 1, max = 255)
    private String description;

    // TODO
    // private Recipe recipe;
}
