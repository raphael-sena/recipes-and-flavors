package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Role;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.user.UserCreateDTO;
import com.recipes.flavors.backend.entities.dto.user.UserUpdateDTO;
import com.recipes.flavors.backend.repositories.RoleRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtDecoder jwtDecoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Usuário não encontrado! Id: " + id + ", Tipo: " + User.class.getName()));
    }

    public Optional<User> findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println("Finding user by email: " + email);
        System.out.println("User found: " + user.isPresent());
        user.ifPresent(u -> {
            System.out.println("Found user details:");
            System.out.println("ID: " + u.getId());
            System.out.println("Email: " + u.getEmail());
            System.out.println("Encoded Password: " + u.getPassword());
            System.out.println("Roles: " + u.getRoles());
        });
        return user;
    }

    @Transactional
    public User create(User obj) {

        var userFromDb = userRepository.findByEmail(obj.getEmail());
        if (userFromDb.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        var roleBasic = roleRepository.findByName(Role.Values.BASIC.name());

        User user = new User();
        user.setId(obj.getId());
        user.setName(obj.getName());
        user.setEmail(obj.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
        user.setRoles(Set.of(roleBasic));

        return userRepository.save(user);
    }

    @Transactional
    public void createAdmin(User user) {
        userRepository.save(user);
    }

    @Transactional
    public User update(User obj) {
        User newObj = findById(obj.getId());
        newObj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        return this.userRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        this.userRepository.deleteById(id);
    }

    public User fromDTO(@Valid UserCreateDTO obj) {
        if (obj.getRole() == null || obj.getRole().isEmpty()) {
            obj.setRole("BASIC");
        }

        Role role = roleRepository.findByName(obj.getRole());
        if (role == null) {
            throw new IllegalArgumentException("Role not found");
        }

        if (obj.getEmail() == null || obj.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        User user = new User();
        user.setEmail(obj.getEmail());
        user.setName(obj.getName());
        user.setPassword(obj.getPassword());
        user.setRoles(Set.of(role));

        return user;
    }

    public User fromDTO(@Valid UserUpdateDTO obj) {
        User user = new User();
        user.setId(obj.getId());
        user.setPassword(obj.getPassword());
        return user;
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public Long extractUserIdFromJWT(String jwt) {
        Jwt decodedJwt = jwtDecoder.decode(jwt);
        String userId = decodedJwt.getSubject();
        return Long.valueOf(userId);
    }

}
