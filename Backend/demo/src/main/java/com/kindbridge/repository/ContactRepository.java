package com.kindbridge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.entity.Contact;

public interface ContactRepository extends MongoRepository<Contact, String> {

}