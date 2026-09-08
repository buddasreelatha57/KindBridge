package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.entity.Campaign;
import com.kindbridge.service.CampaignService;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:5173")
public class CampaignController {

    private final CampaignService campaignService;


    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }


    @GetMapping
    public List<Campaign> getAllCampaigns() {

        return campaignService.getAllCampaigns();

    }


    @GetMapping("/{id}")
    public Campaign getCampaign(@PathVariable String id) {

        return campaignService.getCampaignById(id);

    }


    @PostMapping
    public Campaign addCampaign(
            @RequestBody Campaign campaign) {

        return campaignService.createCampaign(campaign);

    }


    @PutMapping("/{id}")
    public Campaign updateCampaign(
            @PathVariable String id,
            @RequestBody Campaign campaign) {

        return campaignService.updateCampaign(id, campaign);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampaign(
            @PathVariable String id) {

        campaignService.deleteCampaign(id);

        return ResponseEntity.ok(
            "Campaign deleted successfully."
        );
    }
}