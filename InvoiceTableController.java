package com.example.demo.controller;

import com.example.demo.model.InvoiceTable;
import com.example.demo.service.InvoiceTableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceTableController {

    private final InvoiceTableService invoiceTableService;

    @Autowired
    public InvoiceTableController(InvoiceTableService invoiceTableService) {
        this.invoiceTableService = invoiceTableService;
    }

    @GetMapping
    public List<InvoiceTable> getAllInvoices() {
        return invoiceTableService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceTable> getInvoiceById(@PathVariable int id) {
        Optional<InvoiceTable> invoiceTable = invoiceTableService.findById(id);
        return invoiceTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public InvoiceTable createInvoice(@RequestBody InvoiceTable invoiceTable) {
        return invoiceTableService.save(invoiceTable);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceTable> updateInvoice(
            @PathVariable int id, 
            @RequestBody InvoiceTable invoiceTable) {
        if (!invoiceTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        invoiceTable.setInvoiceId(id);
        return ResponseEntity.ok(invoiceTableService.save(invoiceTable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable int id) {
        if (!invoiceTableService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        invoiceTableService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
