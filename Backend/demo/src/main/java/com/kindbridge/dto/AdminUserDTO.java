package com.kindbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDTO {

    private String id;

    private String name;

    private String email;

    private String phone;

    private String role;

    private String createdAt;

    private int donationCount;

    private double totalDonated;

}