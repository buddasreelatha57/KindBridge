package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.SuccessStoryRequest;
import com.kindbridge.entity.SuccessStory;
import com.kindbridge.service.SuccessStoryService;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin("*")
public class SuccessStoryController {

    private final SuccessStoryService service;

    public SuccessStoryController(SuccessStoryService service) {
        this.service = service;
    }

    // Create Story
    @PostMapping
    public ResponseEntity<SuccessStory> createStory(
            @RequestBody SuccessStoryRequest request) {

        return ResponseEntity.ok(service.createStory(request));
    }

    // Get All Stories
    @GetMapping
    public ResponseEntity<List<SuccessStory>> getAllStories() {

        return ResponseEntity.ok(service.getAllStories());
    }

    // Get Story By Id
    @GetMapping("/{id}")
    public ResponseEntity<SuccessStory> getStoryById(
            @PathVariable String id) {

        return ResponseEntity.ok(service.getStoryById(id));
    }

    // Update Story
    @PutMapping("/{id}")
    public ResponseEntity<SuccessStory> updateStory(
            @PathVariable String id,
            @RequestBody SuccessStoryRequest request) {

        return ResponseEntity.ok(service.updateStory(id, request));
    }

    // Delete Story
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStory(
            @PathVariable String id) {

        return ResponseEntity.ok(service.deleteStory(id));
    }
}