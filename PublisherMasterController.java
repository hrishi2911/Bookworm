package com.example.demo.controller;

import com.example.demo.model.PublisherMaster;
import com.example.demo.service.PublisherMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/publishers")
public class PublisherMasterController {

    private final PublisherMasterService publisherMasterService;

    @Autowired
    public PublisherMasterController(PublisherMasterService publisherMasterService) {
        this.publisherMasterService = publisherMasterService;
    }

    @GetMapping
    public List<PublisherMaster> getAllPublishers() {
        return publisherMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublisherMaster> getPublisherById(@PathVariable int id) {
        Optional<PublisherMaster> publisherMaster = publisherMasterService.findById(id);
        return publisherMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public PublisherMaster createPublisher(@RequestBody PublisherMaster publisherMaster) {
        return publisherMasterService.save(publisherMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublisherMaster> updatePublisher(
            @PathVariable int id, 
            @RequestBody PublisherMaster publisherMaster) {
        if (!publisherMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        publisherMaster.setPublisherId(id);
        return ResponseEntity.ok(publisherMasterService.save(publisherMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable int id) {
        if (!publisherMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        publisherMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
