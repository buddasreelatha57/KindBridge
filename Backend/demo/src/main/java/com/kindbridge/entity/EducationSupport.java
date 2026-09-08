package com.kindbridge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "education_support")
public class EducationSupport {

    @Id
    private String id;

    private String title;

    private String description;

    private String category;

    private String beneficiaryName;

    private String institution;

    private double requiredAmount;

    private double collectedAmount;

    private String imageUrl;

    private String status;

    private String createdAt;
}
