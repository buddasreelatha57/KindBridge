package com.kindbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.dto.SuccessStoryRequest;
import com.kindbridge.entity.SuccessStory;
import com.kindbridge.repository.SuccessStoryRepository;

@Service
public class SuccessStoryService {

    private final SuccessStoryRepository repository;

    public SuccessStoryService(SuccessStoryRepository repository) {
        this.repository = repository;
    }

    // Create Story
    public SuccessStory createStory(SuccessStoryRequest request) {

        SuccessStory story = SuccessStory.builder()
                .title(request.getTitle())
                .studentName(request.getStudentName())
                .institution(request.getInstitution())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .sponsoredAmount(request.getSponsoredAmount())
                .completedAt(LocalDateTime.now().toString())
                .build();

        return repository.save(story);
    }

    // Get All Stories
    public List<SuccessStory> getAllStories() {
        return repository.findAll();
    }

    // Get Story By Id
    public SuccessStory getStoryById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Success Story Not Found"));
    }

    // Update Story
    public SuccessStory updateStory(String id, SuccessStoryRequest request) {

        SuccessStory story = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Success Story Not Found"));

        story.setTitle(request.getTitle());
        story.setStudentName(request.getStudentName());
        story.setInstitution(request.getInstitution());
        story.setDescription(request.getDescription());
        story.setImageUrl(request.getImageUrl());
        story.setSponsoredAmount(request.getSponsoredAmount());

        return repository.save(story);
    }

    // Delete Story
    public String deleteStory(String id) {

        SuccessStory story = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Success Story Not Found"));

        repository.delete(story);

        return "Success Story Deleted Successfully";
    }
}