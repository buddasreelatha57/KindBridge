package com.kindbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationSupportRequest {

    private String title;

    private String description;

    private String category;

    private String beneficiaryName;

    private String institution;

    private double requiredAmount;

    private String imageUrl;
}