package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.LanguageMaster;
import com.example.demo.service.LanguageMasterService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/languages")
public class LanguageMasterController {

    @Autowired
    private LanguageMasterService service;

    @GetMapping
    public List<LanguageMaster> getAllLanguages() {
        return service.getAllLanguages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LanguageMaster> getLanguageById(@PathVariable int id) {
        Optional<LanguageMaster> language = service.getLanguageById(id);
        return language.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public LanguageMaster createLanguage(@RequestBody LanguageMaster language) {
        return service.saveLanguage(language);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LanguageMaster> updateLanguage(
            @PathVariable int id, 
            @RequestBody LanguageMaster updatedLanguage) {
        Optional<LanguageMaster> existingLanguage = service.getLanguageById(id);
        if (existingLanguage.isPresent()) {
            LanguageMaster language = existingLanguage.get();
            language.setLanguageDesc(updatedLanguage.getLanguageDesc());
            language.setProductType(updatedLanguage.getProductType());
            return ResponseEntity.ok(service.saveLanguage(language));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable int id) {
        if (service.getLanguageById(id).isPresent()) {
            service.deleteLanguage(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
