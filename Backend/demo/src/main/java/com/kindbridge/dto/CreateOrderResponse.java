package com.kindbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderResponse {

    private String orderId;

    private String currency;

    private double amount;
}