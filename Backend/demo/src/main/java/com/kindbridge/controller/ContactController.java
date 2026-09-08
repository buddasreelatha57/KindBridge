package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.ContactRequest;
import com.kindbridge.entity.Contact;
import com.kindbridge.service.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Contact> submit(
            @RequestBody ContactRequest request) {

        return ResponseEntity.ok(service.submit(request));
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAll() {

        return ResponseEntity.ok(service.getAllContacts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable String id) {

        return ResponseEntity.ok(service.delete(id));
    }
}