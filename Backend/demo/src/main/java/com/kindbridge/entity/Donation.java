package com.kindbridge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

 @Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "donations")
public class Donation {

    @Id
    private String id;

    private String supportId;

    private String campaignId;   // <-- Add this

    private String donorName;

    private String donorEmail;

    private double amount;

    private String paymentId;

    private String paymentStatus;

    private String donatedAt;
}
