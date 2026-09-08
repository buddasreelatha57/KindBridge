package com.kindbridge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.kindbridge.model.CampaignUpdate;
import com.kindbridge.repository.CampaignUpdateRepository;

@RestController
@RequestMapping("/api/campaign-updates")
@CrossOrigin(origins = "http://localhost:5173")
public class CampaignUpdateController {

    private final CampaignUpdateRepository repository;

    public CampaignUpdateController(CampaignUpdateRepository repository) {
        this.repository = repository;
    }

    // Admin adds an update
    @PostMapping
    public CampaignUpdate addUpdate(
            @RequestBody CampaignUpdate update) {

        return repository.save(update);
    }

    // User gets all updates of a campaign
    @GetMapping("/{campaignId}")
    public List<CampaignUpdate> getUpdates(
            @PathVariable String campaignId) {

        return repository.findByCampaignId(campaignId);
    }
}