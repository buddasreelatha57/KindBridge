package com.kindbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.dto.ContactRequest;
import com.kindbridge.entity.Contact;
import com.kindbridge.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    // Submit Contact Form
    public Contact submit(ContactRequest request) {

        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status("PENDING")
                .createdAt(LocalDateTime.now().toString())
                .build();

        return repository.save(contact);
    }

    // Get All Contacts
    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    // Delete Contact
    public String delete(String id) {

        repository.deleteById(id);

        return "Contact Deleted Successfully";
    }
}