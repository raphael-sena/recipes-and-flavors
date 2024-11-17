package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Role;
import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.user.UserCreateDTO;
import com.recipes.flavors.backend.entities.dto.user.UserUpdateDTO;
import com.recipes.flavors.backend.repositories.RoleRepository;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Usuário não encontrado! Id: " + id + ", Tipo: " + User.class.getName()));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User create(User obj) {
        var roleBasic = roleRepository.findByName(Role.Values.BASIC.name());
        User user = new User();
        user.setId(obj.getId());
        user.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
        user.setRoles(Set.of(roleBasic));
        return user;
    }

    public void createAdmin(User usuario) {
        userRepository.save(usuario);
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
        User user = new User();
        user.setEmail(obj.getEmail());
        user.setName(obj.getName());
        user.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
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

}
