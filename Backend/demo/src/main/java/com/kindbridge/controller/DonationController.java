package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.DonationRequest;
import com.kindbridge.dto.DonationResponse;
import com.kindbridge.entity.Donation;
import com.kindbridge.service.DonationService;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin("*")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    // Donate
    @PostMapping
    public ResponseEntity<DonationResponse> donate(
            @RequestBody DonationRequest request) {

        return ResponseEntity.ok(donationService.donate(request));
    }

    // Get all donations
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {

        return ResponseEntity.ok(donationService.getAllDonations());
    }

    // Get donations by Education Support
    @GetMapping("/support/{supportId}")
    public ResponseEntity<List<Donation>> getDonationsBySupport(
            @PathVariable String supportId) {

        return ResponseEntity.ok(
                donationService.getDonationsBySupport(supportId));
    }

    // Get donations by donor email
    @GetMapping("/donor/{email}")
    public ResponseEntity<List<Donation>> getDonationsByDonor(
            @PathVariable String email) {

        return ResponseEntity.ok(
                donationService.getDonationsByDonor(email));
    }
    
    
}