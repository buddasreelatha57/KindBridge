package com.kindbridge.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactRequest {

    private String name;

    private String email;

    private String subject;

    private String message;
}