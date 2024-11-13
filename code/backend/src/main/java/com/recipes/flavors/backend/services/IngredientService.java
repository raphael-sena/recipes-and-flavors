package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Ingredient;
import com.recipes.flavors.backend.entities.dto.IngredientCreateDTO;
import com.recipes.flavors.backend.entities.dto.IngredientUpdateDTO;
import com.recipes.flavors.backend.repositories.IngredientRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient findById(Long id) {
        Optional<Ingredient> user = this.ingredientRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Ingrediente não encontrado! Id: " + id + ", Tipo: " + Ingredient.class.getName()));
    }

    @Transactional
    public Ingredient create(Ingredient obj) {
        obj.setId(null);
        obj.setName(obj.getName());
        obj.setQuantity(obj.getQuantity());
        obj.setUnity(obj.getUnity());
        obj = this.ingredientRepository.save(obj);
        return obj;
    }

    @Transactional
    public Ingredient update(Ingredient obj) {
        Ingredient newObj = findById(obj.getId());
        newObj.setName(obj.getName());
        newObj.setQuantity(obj.getQuantity());
        newObj.setUnity(obj.getUnity());
        return this.ingredientRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        this.ingredientRepository.deleteById(id);
    }

    public Ingredient fromDTO(@Valid IngredientCreateDTO obj) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(obj.getName());
        ingredient.setQuantity(obj.getQuantity());
        ingredient.setUnity(obj.getUnity());
        return ingredient;
    }

    public Ingredient fromDTO(@Valid IngredientUpdateDTO obj) {
        Ingredient ingredient = new Ingredient();
        ingredient.setId(obj.getId());
        ingredient.setName(obj.getName());
        ingredient.setQuantity(obj.getQuantity());
        ingredient.setUnity(obj.getUnity());
        return ingredient;
    }
}
