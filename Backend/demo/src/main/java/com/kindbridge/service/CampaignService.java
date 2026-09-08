package com.kindbridge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.entity.Campaign;
import com.kindbridge.repository.CampaignRepository;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign getCampaignById(String id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
    }

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaign(String id, Campaign updatedCampaign) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setTitle(updatedCampaign.getTitle());
        campaign.setCategory(updatedCampaign.getCategory());
        campaign.setDescription(updatedCampaign.getDescription());
        campaign.setStory(updatedCampaign.getStory());

        campaign.setBeneficiaryName(updatedCampaign.getBeneficiaryName());
        campaign.setBeneficiaryAge(updatedCampaign.getBeneficiaryAge());
        campaign.setLocation(updatedCampaign.getLocation());
        campaign.setEducationLevel(updatedCampaign.getEducationLevel());
        campaign.setInstitutionName(updatedCampaign.getInstitutionName());

        campaign.setTargetAmount(updatedCampaign.getTargetAmount());
        campaign.setRaisedAmount(updatedCampaign.getRaisedAmount());

        campaign.setImageUrl(updatedCampaign.getImageUrl());

        campaign.setDeadline(updatedCampaign.getDeadline());
        campaign.setStatus(updatedCampaign.getStatus());
        campaign.setVerified(updatedCampaign.isVerified());

        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(String id) {

        if (!campaignRepository.existsById(id)) {
            throw new RuntimeException("Campaign not found");
        }

        campaignRepository.deleteById(id);
    }
}