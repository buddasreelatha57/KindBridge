package com.kindbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationResponse {

    private String message;

    private String donorName;

    private String donorEmail;

    private String paymentId;

    private double amount;
}