package com.kindbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationRequest {

    private String supportId;

    private String campaignId;

    private String donorName;

    private String donorEmail;

    private double amount;
}