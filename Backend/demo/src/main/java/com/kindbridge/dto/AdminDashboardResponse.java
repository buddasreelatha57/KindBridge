package com.kindbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalUsers;

    private long totalDonations;

    private double totalDonationAmount;

    private long activeDonors;

    private long totalSupports;

    private long completedSupports;

    private long totalSuccessStories;

    private double averageDonation;

}