package com.example.demo.controller;

import com.example.demo.model.ProductBenMaster;
import com.example.demo.service.ProductBenMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-beneficiaries")
public class ProductBenMasterController {

    private final ProductBenMasterService productBenMasterService;

    @Autowired
    public ProductBenMasterController(ProductBenMasterService productBenMasterService) {
        this.productBenMasterService = productBenMasterService;
    }

    @GetMapping
    public List<ProductBenMaster> getAllProductBeneficiaries() {
        return productBenMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductBenMaster> getProductBeneficiaryById(@PathVariable int id) {
        Optional<ProductBenMaster> productBenMaster = productBenMasterService.findById(id);
        return productBenMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductBenMaster createProductBeneficiary(@RequestBody ProductBenMaster productBenMaster) {
        return productBenMasterService.save(productBenMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductBenMaster> updateProductBeneficiary(
            @PathVariable int id, 
            @RequestBody ProductBenMaster productBenMaster) {
        if (!productBenMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productBenMaster.setProdBenId(id);
        return ResponseEntity.ok(productBenMasterService.save(productBenMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductBeneficiary(@PathVariable int id) {
        if (!productBenMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productBenMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
