package com.kindbridge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "success_stories")
public class SuccessStory {

    @Id
    private String id;

    private String title;

    private String studentName;

    private String institution;

    private String description;

    private String imageUrl;

    private double sponsoredAmount;

    private String completedAt;
}