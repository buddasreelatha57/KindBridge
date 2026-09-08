package com.kindbridge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.entity.EducationSupport;

public interface EducationSupportRepository
        extends MongoRepository<EducationSupport, String> {

}
