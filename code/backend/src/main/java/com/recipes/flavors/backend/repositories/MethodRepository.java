package com.recipes.flavors.backend.repositories;

import com.recipes.flavors.backend.entities.Method;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MethodRepository extends JpaRepository<Method, Long> {
}
