package com.recipes.flavors.backend.controllers;

import com.recipes.flavors.backend.entities.Method;
import com.recipes.flavors.backend.entities.dto.MethodCreateDTO;
import com.recipes.flavors.backend.entities.dto.MethodUpdateDTO;
import com.recipes.flavors.backend.services.MethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/method")
@Validated
public class MethodController {

    @Autowired
    private MethodService methodService;

    @GetMapping("/{id}")
    public ResponseEntity<Method> findById(@PathVariable Long id) {
        Method obj = this.methodService.findById(id);
        return ResponseEntity
                .ok()
                .body(obj);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody MethodCreateDTO obj) {

        Method method = this.methodService.fromDTO(obj);
        Method newMethod = this.methodService.create(method);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newMethod.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody MethodUpdateDTO obj, @PathVariable Long id) {

        obj.setId(id);

        Method method = this.methodService.fromDTO(obj);
        this.methodService.update(method);

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.methodService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
