package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Recipe;
import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.review.ReviewCreateDTO;
import com.recipes.flavors.backend.entities.dto.review.ReviewUpdateDTO;
import com.recipes.flavors.backend.repositories.RecipeRepository;
import com.recipes.flavors.backend.repositories.ReviewRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private RecipeService recipeService;


    public Review findById(Long id) {
        Optional<Review> review = this.reviewRepository.findById(id);
        return review.orElseThrow(() -> new ObjectNotFoundException(
                "Review não encontrada! Id: " + id + ", Tipo: " + Review.class.getName()));
    }

    @Transactional
    public Review create(Review obj, Long recipeId) {

        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        obj.setRecipe(recipe.get());
        obj.setUser(obj.getUser());
        obj.setComment(obj.getComment());
        obj.setRating(obj.getRating());
        obj = this.reviewRepository.save(obj);
        return obj;
    }

    @Transactional
    public Review update(Review obj) {

        if (obj.getId() == null) {
            throw new IllegalArgumentException("The given id must not be null");
        }

        Review newObj = findById(obj.getId());

        newObj.setComment(obj.getComment());
        newObj.setRating(obj.getRating());
        return this.reviewRepository.save(newObj);
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        this.reviewRepository.deleteById(id);
    }

    public Review fromDTO(@Valid ReviewCreateDTO obj, Long recipeId) {

        if (obj.getUserId() == null) {
            throw new ObjectNotFoundException("Usuário deve possuir um ID válido.");
        }

        User user = userService.findById(obj.getUserId());
        Recipe recipe = recipeService.findById(recipeId);

        Review review = new Review();
        review.setComment(obj.getComment());
        review.setUser(user);
        review.setRating(obj.getRating());
        review.setRecipe(recipe);

        return review;
    }

    public Review fromDTO(@Valid ReviewUpdateDTO obj) {
        Review review = new Review();
        review.setId(obj.getId());
        review.setComment(obj.getComment());
        review.setRating(obj.getRating());
        return review;
    }

    public Page<Review> findByRecipeId(Long recipeId, Pageable pageable) {
        return reviewRepository.findByRecipeId(recipeId, pageable);
    }
}
