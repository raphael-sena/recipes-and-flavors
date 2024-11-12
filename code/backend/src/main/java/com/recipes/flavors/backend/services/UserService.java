package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.User;
import com.recipes.flavors.backend.entities.dto.UserCreateDTO;
import com.recipes.flavors.backend.repositories.UserRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Usuário não encontrado! Id: " + id + ", Tipo: " + User.class.getName()));
    }

    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj.setName(obj.getName());
        obj.setEmail(obj.getEmail());
        obj.setPassword(obj.getPassword());
        obj = this.userRepository.save(obj);
        return obj;
    }

    public User fromDTO(@Valid UserCreateDTO obj) {
        User user = new User();
        user.setName(obj.getName());
        user.setEmail(obj.getEmail());
        user.setPassword(obj.getPassword());
        return user;
    }
}
