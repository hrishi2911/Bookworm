package com.example.demo.controller;

import com.example.demo.model.BeneficiaryMaster;
import com.example.demo.service.BeneficiaryMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryMasterController {

    private final BeneficiaryMasterService beneficiaryMasterService;

    @Autowired
    public BeneficiaryMasterController(BeneficiaryMasterService beneficiaryMasterService) {
        this.beneficiaryMasterService = beneficiaryMasterService;
    }

    @GetMapping
    public List<BeneficiaryMaster> getAllBeneficiaries() {
        return beneficiaryMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BeneficiaryMaster> getBeneficiaryById(@PathVariable int id) {
        Optional<BeneficiaryMaster> beneficiaryMaster = beneficiaryMasterService.findById(id);
        return beneficiaryMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public BeneficiaryMaster createBeneficiary(@RequestBody BeneficiaryMaster beneficiaryMaster) {
        return beneficiaryMasterService.save(beneficiaryMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BeneficiaryMaster> updateBeneficiary(
            @PathVariable int id, 
            @RequestBody BeneficiaryMaster beneficiaryMaster) {
        if (!beneficiaryMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        beneficiaryMaster.setBenId(id);
        return ResponseEntity.ok(beneficiaryMasterService.save(beneficiaryMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficiary(@PathVariable int id) {
        if (!beneficiaryMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        beneficiaryMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
