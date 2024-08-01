package com.example.demo.controller;

import com.example.demo.model.ProductAttributeTable;
import com.example.demo.service.ProductAttributeTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-attributes")
public class ProductAttributeTableController {

    private final ProductAttributeTableService productAttributeTableService;

    @Autowired
    public ProductAttributeTableController(ProductAttributeTableService productAttributeTableService) {
        this.productAttributeTableService = productAttributeTableService;
    }

    @GetMapping
    public List<ProductAttributeTable> getAllProductAttributes() {
        return productAttributeTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductAttributeTable> getProductAttributeById(@PathVariable int id) {
        Optional<ProductAttributeTable> productAttributeTable = productAttributeTableService.findById(id);
        return productAttributeTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductAttributeTable createProductAttribute(@RequestBody ProductAttributeTable productAttributeTable) {
        return productAttributeTableService.save(productAttributeTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductAttributeTable> updateProductAttribute(
            @PathVariable int id, 
            @RequestBody ProductAttributeTable productAttributeTable) {
        if (!productAttributeTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productAttributeTable.setProdAttId(id);
        return ResponseEntity.ok(productAttributeTableService.save(productAttributeTable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductAttribute(@PathVariable int id) {
        if (!productAttributeTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productAttributeTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
