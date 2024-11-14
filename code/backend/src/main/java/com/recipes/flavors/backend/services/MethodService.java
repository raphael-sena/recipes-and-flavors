package com.recipes.flavors.backend.services;

import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.dto.method.MethodCreateDTO;
import com.recipes.flavors.backend.entities.dto.method.MethodUpdateDTO;
import com.recipes.flavors.backend.repositories.MethodRepository;
import com.recipes.flavors.backend.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Optional;

@Service
public class MethodService {

    @Autowired
    private MethodRepository methodRepository;

    public Method findById(Long id) {
        Optional<Method> review = this.methodRepository.findById(id);
        return review.orElseThrow(() -> new ObjectNotFoundException(
                "Passo não encontrado! Id: " + id + ", Tipo: " + Method.class.getName()));
    }

    @Transactional
    public Method create(Method obj) {
        obj.setId(null);
        obj.setDescription(obj.getDescription());
        obj = this.methodRepository.save(obj);
        return obj;
    }

    @Transactional
    public Method update(Method obj) {
        Method newObj = findById(obj.getId());
        newObj.setDescription(obj.getDescription());
        return this.methodRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        this.methodRepository.deleteById(id);
    }

    public Method fromDTO(@Valid MethodCreateDTO obj) {
        Method method = new Method();
        method.setDescription(obj.getDescription());
        return method;
    }

    public Method fromDTO(@Valid MethodUpdateDTO obj) {
        Method method = new Method();
        method.setId(obj.getId());
        method.setDescription(obj.getDescription());
        return method;
    }
}
