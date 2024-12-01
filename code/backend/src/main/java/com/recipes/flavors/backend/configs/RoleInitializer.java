package com.recipes.flavors.backend.configs;

import com.recipes.flavors.backend.entities.Role;
import com.recipes.flavors.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.findByName("ADMIN") == null) {
            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName("BASIC") == null) {
            Role basicRole = new Role();
            basicRole.setName("BASIC");
            roleRepository.save(basicRole);
        }
    }
}
