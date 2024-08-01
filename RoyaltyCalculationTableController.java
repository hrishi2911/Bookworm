package com.example.demo.controller;

import com.example.demo.model.RoyaltyCalculationTable;
import com.example.demo.service.RoyaltyCalculationTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/royalty-calculations")
public class RoyaltyCalculationTableController {

    private final RoyaltyCalculationTableService royaltyCalculationTableService;

    @Autowired
    public RoyaltyCalculationTableController(RoyaltyCalculationTableService royaltyCalculationTableService) {
        this.royaltyCalculationTableService = royaltyCalculationTableService;
    }

    @GetMapping
    public List<RoyaltyCalculationTable> getAllRoyaltyCalculations() {
        return royaltyCalculationTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoyaltyCalculationTable> getRoyaltyCalculationById(@PathVariable int id) {
        Optional<RoyaltyCalculationTable> royaltyCalculationTable = royaltyCalculationTableService.findById(id);
        return royaltyCalculationTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public RoyaltyCalculationTable createRoyaltyCalculation(@RequestBody RoyaltyCalculationTable royaltyCalculationTable) {
        return royaltyCalculationTableService.save(royaltyCalculationTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoyaltyCalculationTable> updateRoyaltyCalculation(
            @PathVariable int id, 
            @RequestBody RoyaltyCalculationTable royaltyCalculationTable) {
        if (!royaltyCalculationTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        royaltyCalculationTable.setRoyCalId(id);
        return ResponseEntity.ok(royaltyCalculationTableService.save(royaltyCalculationTable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoyaltyCalculation(@PathVariable int id) {
        if (!royaltyCalculationTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        royaltyCalculationTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
