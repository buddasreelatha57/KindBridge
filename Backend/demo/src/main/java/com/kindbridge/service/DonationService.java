package com.kindbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.dto.DonationRequest;
import com.kindbridge.dto.DonationResponse;
import com.kindbridge.dto.VerifyPaymentRequest;
import com.kindbridge.entity.Campaign;
import com.kindbridge.entity.Donation;
import com.kindbridge.entity.EducationSupport;
import com.kindbridge.repository.CampaignRepository;
import com.kindbridge.repository.DonationRepository;
import com.kindbridge.repository.EducationSupportRepository;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final EducationSupportRepository educationSupportRepository;
    private final CampaignRepository campaignRepository;

    public DonationService(DonationRepository donationRepository,
                           EducationSupportRepository educationSupportRepository,
                           CampaignRepository campaignRepository) {

        this.donationRepository = donationRepository;
        this.educationSupportRepository = educationSupportRepository;
        this.campaignRepository = campaignRepository;
    }

    // Make Donation
    public DonationResponse donate(DonationRequest request) {

        if ((request.getCampaignId() == null || request.getCampaignId().isBlank())
                && (request.getSupportId() == null || request.getSupportId().isBlank())) {
            throw new RuntimeException("campaignId or supportId is required");
        }

        Donation donation;
        Donation savedDonation;

        if (request.getSupportId() != null && !request.getSupportId().isBlank()) {
            var support = educationSupportRepository.findById(request.getSupportId())
                    .orElseThrow(() -> new RuntimeException("Support not found"));

            donation = Donation.builder()
                    .supportId(request.getSupportId())
                    .donorName(request.getDonorName())
                    .donorEmail(request.getDonorEmail())
                    .amount(request.getAmount())
                    .paymentId("PAY" + System.currentTimeMillis())
                    .paymentStatus("SUCCESS")
                    .donatedAt(LocalDateTime.now().toString())
                    .build();

            savedDonation = donationRepository.save(donation);

            support.setCollectedAmount(support.getCollectedAmount() + request.getAmount());
            if (support.getCollectedAmount() >= support.getRequiredAmount()) {
                support.setStatus("COMPLETED");
            }
            educationSupportRepository.save(support);

        } else {
            Campaign campaign = campaignRepository.findById(request.getCampaignId())
                    .orElseThrow(() -> new RuntimeException("Campaign not found"));

            donation = Donation.builder()
                    .campaignId(request.getCampaignId())
                    .supportId(request.getSupportId())
                    .donorName(request.getDonorName())
                    .donorEmail(request.getDonorEmail())
                    .amount(request.getAmount())
                    .paymentId("PAY" + System.currentTimeMillis())
                    .paymentStatus("SUCCESS")
                    .donatedAt(LocalDateTime.now().toString())
                    .build();

            savedDonation = donationRepository.save(donation);

            campaign.setRaisedAmount(campaign.getRaisedAmount() + request.getAmount());
            if (campaign.getRaisedAmount() >= campaign.getTargetAmount()) {
                campaign.setStatus("COMPLETED");
            }
            campaignRepository.save(campaign);
        }

        return DonationResponse.builder()
                .message("Donation Successful")
                .donorName(savedDonation.getDonorName())
                .donorEmail(savedDonation.getDonorEmail())
                .paymentId(savedDonation.getPaymentId())
                .amount(savedDonation.getAmount())
                .build();
    }

    // Get all donations
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    // Get donations by Education Support
    public List<Donation> getDonationsBySupport(String supportId) {
        return donationRepository.findBySupportId(supportId);
    }

    // Get donations by donor
    public List<Donation> getDonationsByDonor(String donorEmail) {
        return donationRepository.findByDonorEmail(donorEmail);
    }
    
    public DonationResponse saveDonation(VerifyPaymentRequest request) {

        EducationSupport support = educationSupportRepository
                .findById(request.getSupportId())
                .orElseThrow(() ->
                        new RuntimeException("Support Not Found"));

        Donation donation = Donation.builder()
                .supportId(request.getSupportId())
                .donorName(request.getDonorName())
                .donorEmail(request.getDonorEmail())
                .amount(request.getAmount())
                .paymentId(request.getRazorpayPaymentId())
                .paymentStatus("SUCCESS")
                .donatedAt(LocalDateTime.now().toString())
                .build();

        Donation saved = donationRepository.save(donation);

        support.setCollectedAmount(
                support.getCollectedAmount()
                + request.getAmount());

        if (support.getCollectedAmount()
                >= support.getRequiredAmount()) {

            support.setStatus("COMPLETED");
        }

        educationSupportRepository.save(support);

        return DonationResponse.builder()
                .message("Donation Successful")
                .paymentId(saved.getPaymentId())
                .donorName(saved.getDonorName())
                .donorEmail(saved.getDonorEmail())
                .amount(saved.getAmount())
                .build();
    }


    public Donation updateDonation(
        String id,
        Donation updatedDonation) {


    Donation existingDonation =
            donationRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Donation not found")
            );


    existingDonation.setDonorName(
            updatedDonation.getDonorName()
    );


    existingDonation.setDonorEmail(
            updatedDonation.getDonorEmail()
    );


    existingDonation.setAmount(
            updatedDonation.getAmount()
    );


    existingDonation.setPaymentStatus(
            updatedDonation.getPaymentStatus()
    );


    existingDonation.setPaymentId(
            updatedDonation.getPaymentId()
    );


    return donationRepository.save(existingDonation);
}

public void deleteDonation(String id) {

    if(!donationRepository.existsById(id)){

        throw new RuntimeException(
            "Donation not found"
        );
    }

    donationRepository.deleteById(id);
}
    
}