package com.example.demo.controller;

import com.example.demo.model.CustomerMaster;
import com.example.demo.service.CustomerMasterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerMasterController {

    private final CustomerMasterService customerMasterService;

    @Autowired
    public CustomerMasterController(CustomerMasterService customerMasterService) {
        this.customerMasterService = customerMasterService;
    }

    @GetMapping
    public List<CustomerMaster> getAllCustomers() {
        return customerMasterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerMaster> getCustomerById(@PathVariable int id) {
        Optional<CustomerMaster> customerMaster = customerMasterService.findById(id);
        return customerMaster.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CustomerMaster createCustomer(@RequestBody CustomerMaster customerMaster) {
        return customerMasterService.save(customerMaster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerMaster> updateCustomer(
            @PathVariable int id, 
            @RequestBody CustomerMaster customerMaster) {
        if (!customerMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        customerMaster.setCustomerId(id);
        return ResponseEntity.ok(customerMasterService.save(customerMaster));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id) {
        if (!customerMasterService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        customerMasterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
