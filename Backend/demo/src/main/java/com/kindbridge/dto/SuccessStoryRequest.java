package com.kindbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuccessStoryRequest {

    private String title;

    private String studentName;

    private String institution;

    private String description;

    private String imageUrl;

    private double sponsoredAmount;
}