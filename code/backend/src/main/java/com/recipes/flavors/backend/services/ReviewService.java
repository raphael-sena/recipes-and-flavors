package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Review;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.ReviewCreateDTO;
import com.recipes.flavors.backend.entities.dto.ReviewUpdateDTO;
import com.recipes.flavors.backend.repositories.ReviewRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;


    public Review findById(Long id) {
        Optional<Review> review = this.reviewRepository.findById(id);
        return review.orElseThrow(() -> new ObjectNotFoundException(
                "Review não encontrada! Id: " + id + ", Tipo: " + Review.class.getName()));
    }

    @Transactional
    public Review create(Review obj) {
        obj.setId(null);
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

    public void delete(Long id) {
        findById(id);
        this.reviewRepository.deleteById(id);
    }

    public Review fromDTO(@Valid ReviewCreateDTO obj) {

        if (obj.getUser() == null || obj.getUser().getId() == null) {
            throw new ObjectNotFoundException("Usuário deve possuir um ID válido.");
        }

        User user = userRepository
                .findById(obj.getUser().getId())
                .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!"));

        Review review = new Review();
        review.setComment(obj.getComment());
        review.setUser(user);
        review.setRating(obj.getRating());

        return review;
    }

    public Review fromDTO(@Valid ReviewUpdateDTO obj) {
        Review review = new Review();
        review.setId(obj.getId());
        review.setComment(obj.getComment());
        review.setRating(obj.getRating());
        return review;
    }
}
