package com.kindbridge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.entity.Campaign;

public interface CampaignRepository 
        extends MongoRepository<Campaign,String>{

}