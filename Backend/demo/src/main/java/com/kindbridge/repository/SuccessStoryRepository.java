package com.kindbridge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.entity.SuccessStory;

public interface SuccessStoryRepository
        extends MongoRepository<SuccessStory, String> {

}