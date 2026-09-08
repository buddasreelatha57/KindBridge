package com.kindbridge.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public ImageUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) {

        try {

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of());

            return result.get("secure_url").toString();

        } catch (IOException e) {

            throw new RuntimeException("Image Upload Failed");
        }

    }

}