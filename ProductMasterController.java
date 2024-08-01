package com.example.demo.controller;

import com.example.demo.model.ProductMaster;
import com.example.demo.service.ProductMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductMasterController {

    private final ProductMasterService productMasterService;

    @Autowired
    public ProductMasterController(ProductMasterService productMasterService) {
        this.productMasterService = productMasterService;
    }

    @GetMapping
    public List<ProductMaster> getAllProducts() {
        return productMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductMaster> getProductById(@PathVariable int id) {
        Optional<ProductMaster> productMaster = productMasterService.findById(id);
        return productMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductMaster createProduct(@RequestBody ProductMaster productMaster) {
        return productMasterService.save(productMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductMaster> updateProduct(
            @PathVariable int id, 
            @RequestBody ProductMaster productMaster) {
        if (!productMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productMaster.setProductId(id);
        return ResponseEntity.ok(productMasterService.save(productMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        if (!productMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
