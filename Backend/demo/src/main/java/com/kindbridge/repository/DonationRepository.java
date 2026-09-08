package com.kindbridge.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kindbridge.entity.Donation;

public interface DonationRepository
        extends MongoRepository<Donation, String> {
	
	 List<Donation> findBySupportId(String supportId);

	    List<Donation> findByDonorEmail(String donorEmail);

		List<Donation> findByCampaignId(String campaignId);


}
