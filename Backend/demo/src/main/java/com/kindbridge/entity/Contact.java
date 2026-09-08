package com.kindbridge.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "contacts")
public class Contact {

    @Id
    private String id;

    private String name;

    private String email;

    private String subject;

    private String message;

    private String status;

    private String createdAt;
}