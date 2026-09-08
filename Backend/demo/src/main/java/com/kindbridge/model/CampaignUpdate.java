package com.kindbridge.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "campaign_updates")
public class CampaignUpdate {

    @Id
    private String id;

    private String campaignId;

    private String title;

    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();

    public CampaignUpdate() {
    }

    public CampaignUpdate(String campaignId, String title, String description) {
        this.campaignId = campaignId;
        this.title = title;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}