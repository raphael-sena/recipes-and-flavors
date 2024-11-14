package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
