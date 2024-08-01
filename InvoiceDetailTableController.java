package com.example.demo.controller;

import com.example.demo.model.InvoiceDetailTable;
import com.example.demo.service.InvoiceDetailTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoice-details")
public class InvoiceDetailTableController {

    private final InvoiceDetailTableService invoiceDetailTableService;

    @Autowired
    public InvoiceDetailTableController(InvoiceDetailTableService invoiceDetailTableService) {
        this.invoiceDetailTableService = invoiceDetailTableService;
    }

    @GetMapping
    public List<InvoiceDetailTable> getAllInvoiceDetails() {
        return invoiceDetailTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDetailTable> getInvoiceDetailById(@PathVariable int id) {
        Optional<InvoiceDetailTable> invoiceDetailTable = invoiceDetailTableService.findById(id);
        return invoiceDetailTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public InvoiceDetailTable createInvoiceDetail(@RequestBody InvoiceDetailTable invoiceDetailTable) {
        return invoiceDetailTableService.save(invoiceDetailTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDetailTable> updateInvoiceDetail(
            @PathVariable int id, 
            @RequestBody InvoiceDetailTable invoiceDetailTable) {
        if (!invoiceDetailTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        invoiceDetailTable.setInvDtlId(id);
        return ResponseEntity.ok(invoiceDetailTableService.save(invoiceDetailTable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoiceDetail(@PathVariable int id) {
        if (!invoiceDetailTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        invoiceDetailTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
