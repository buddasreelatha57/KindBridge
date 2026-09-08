package com.kindbridge.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.model.CampaignUpdate;

public interface CampaignUpdateRepository
        extends MongoRepository<CampaignUpdate, String> {

    List<CampaignUpdate> findByCampaignId(String campaignId);

}