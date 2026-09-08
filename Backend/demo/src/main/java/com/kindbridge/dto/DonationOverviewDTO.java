package com.kindbridge.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class DonationOverviewDTO {


    private String campaignId;

    private String campaignTitle;

    private String category;

    private double targetAmount;

    private double raisedAmount;

    private long donationCount;

}