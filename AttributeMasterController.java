package com.example.demo.controller;

import com.example.demo.model.AttributeMaster;
import com.example.demo.service.AttributeMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attributes")
public class AttributeMasterController {

    private final AttributeMasterService attributeMasterService;

    @Autowired
    public AttributeMasterController(AttributeMasterService attributeMasterService) {
        this.attributeMasterService = attributeMasterService;
    }

    @GetMapping
    public List<AttributeMaster> getAllAttributes() {
        return attributeMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeMaster> getAttributeById(@PathVariable int id) {
        Optional<AttributeMaster> attributeMaster = attributeMasterService.findById(id);
        return attributeMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public AttributeMaster createAttribute(@RequestBody AttributeMaster attributeMaster) {
        return attributeMasterService.save(attributeMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeMaster> updateAttribute(
            @PathVariable int id, 
            @RequestBody AttributeMaster attributeMaster) {
        if (!attributeMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        attributeMaster.setAttributeId(id);
        return ResponseEntity.ok(attributeMasterService.save(attributeMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable int id) {
        if (!attributeMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        attributeMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
