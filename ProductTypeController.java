package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.ProductType;
import com.example.demo.service.ProductTypeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-types")
public class ProductTypeController {

    @Autowired
    private ProductTypeService service;

    @GetMapping
    public List<ProductType> getAllProductTypes() {
        return service.getAllProductTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductType> getProductTypeById(@PathVariable int id) {
        Optional<ProductType> productType = service.getProductTypeById(id);
        return productType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductType createProductType(@RequestBody ProductType productType) {
        return service.saveProductType(productType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductType> updateProductType(
            @PathVariable int id, 
            @RequestBody ProductType updatedProductType) {
        Optional<ProductType> existingProductType = service.getProductTypeById(id);
        if (existingProductType.isPresent()) {
            ProductType productType = existingProductType.get();
            productType.setTypeDesc(updatedProductType.getTypeDesc());
            return ResponseEntity.ok(service.saveProductType(productType));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductType(@PathVariable int id) {
        if (service.getProductTypeById(id).isPresent()) {
            service.deleteProductType(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

