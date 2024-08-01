package com.example.demo.controller;

import com.example.demo.model.MyShelfTable;
import com.example.demo.service.MyShelfTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/MyShelf")
public class MyShelfTableController {

    private final MyShelfTableService myShelfTableService;

    @Autowired
    public MyShelfTableController(MyShelfTableService myShelfTableService) {
        this.myShelfTableService = myShelfTableService;
    }

    @GetMapping
    public List<MyShelfTable> getAllShelves() {
        return myShelfTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MyShelfTable> getShelfById(@PathVariable int id) {
        Optional<MyShelfTable> myShelfTable = myShelfTableService.findById(id);
        return myShelfTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public MyShelfTable createShelf(@RequestBody MyShelfTable myShelfTable) {
        return myShelfTableService.save(myShelfTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MyShelfTable> updateShelf(
            @PathVariable int id, 
            @RequestBody MyShelfTable myShelfTable) {
        if (!myShelfTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        myShelfTable.setShelfId(id);
        return ResponseEntity.ok(myShelfTableService.save(myShelfTable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelf(@PathVariable int id) {
        if (!myShelfTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        myShelfTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
