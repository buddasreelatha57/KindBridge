package com.kindbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyPaymentRequest {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private String supportId;

    private String donorName;

    private String donorEmail;

    private double amount;
}
