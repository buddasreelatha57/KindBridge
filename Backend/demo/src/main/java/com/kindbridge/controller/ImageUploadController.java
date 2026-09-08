package com.kindbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kindbridge.service.ImageUploadService;

@RestController
@RequestMapping("/api/images")
@CrossOrigin("*")
public class ImageUploadController {

    private final ImageUploadService service;

    public ImageUploadController(ImageUploadService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                service.uploadImage(file));
    }
}