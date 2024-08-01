package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.GenreMaster;
import com.example.demo.service.GenreMasterService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/genres")
public class GenreMasterController {

    @Autowired
    private GenreMasterService service;

    @GetMapping
    public List<GenreMaster> getAllGenres() {
        return service.getAllGenres();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenreMaster> getGenreById(@PathVariable int id) {
        Optional<GenreMaster> genre = service.getGenreById(id);
        return genre.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public GenreMaster createGenre(@RequestBody GenreMaster genre) {
        return service.saveGenre(genre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GenreMaster> updateGenre(
            @PathVariable int id, 
            @RequestBody GenreMaster updatedGenre) {
        Optional<GenreMaster> existingGenre = service.getGenreById(id);
        if (existingGenre.isPresent()) {
            GenreMaster genre = existingGenre.get();
            genre.setGenreDesc(updatedGenre.getGenreDesc());
            genre.setLanguageMaster(updatedGenre.getLanguageMaster());
            return ResponseEntity.ok(service.saveGenre(genre));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable int id) {
        if (service.getGenreById(id).isPresent()) {
            service.deleteGenre(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
