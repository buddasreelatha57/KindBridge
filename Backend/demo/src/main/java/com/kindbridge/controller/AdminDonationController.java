package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.kindbridge.dto.DonationOverviewDTO;
import com.kindbridge.entity.Donation;
import com.kindbridge.entity.User;
import com.kindbridge.repository.CampaignRepository;
import com.kindbridge.repository.DonationRepository;
import com.kindbridge.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequestMapping("/api/admin/donations")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDonationController {

    private final CampaignRepository campaignRepository;
    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    public AdminDonationController(
            CampaignRepository campaignRepository,
            DonationRepository donationRepository,
            UserRepository userRepository) {

        this.campaignRepository = campaignRepository;
        this.donationRepository = donationRepository;
        this.userRepository = userRepository;
    }

    private void ensureAdmin(Authentication authentication) {

        System.out.println("====================================");
        System.out.println("Authentication Object : " + authentication);

        if (authentication == null || authentication.getName() == null) {
            System.out.println("Authentication is NULL");
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentication required"
            );
        }

        System.out.println("Logged In Email : " + authentication.getName());

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> {
                    System.out.println("User NOT found in MongoDB");
                    return new ResponseStatusException(
                            HttpStatus.UNAUTHORIZED,
                            "User not found"
                    );
                });

        System.out.println("User Name : " + user.getName());
        System.out.println("Role from MongoDB : " + user.getRole());

        String role = user.getRole() == null
                ? "USER"
                : user.getRole()
                        .trim()
                        .toUpperCase()
                        .replaceFirst("^ROLE_", "");

        System.out.println("Normalized Role : " + role);

        if (!"ADMIN".equals(role)) {
            System.out.println("Access Denied - Not Admin");
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin access required"
            );
        }

        System.out.println("Admin Verified Successfully");
        System.out.println("====================================");
    }
   


    @GetMapping("/overview")
    public List<DonationOverviewDTO> overview(Authentication authentication) {
         System.out.println("Inside Admin Donation Controller");
        ensureAdmin(authentication);

        return campaignRepository.findAll()
                .stream()
                .map(campaign -> {

                    List<Donation> donations =
                            donationRepository.findByCampaignId(campaign.getId());

                    double raised = donations.stream()
                            .mapToDouble(Donation::getAmount)
                            .sum();

                    return new DonationOverviewDTO(
                            campaign.getId(),
                            campaign.getTitle(),
                            campaign.getCategory(),
                            campaign.getTargetAmount(),
                            raised,
                            donations.size()
                    );
                })
                .toList();
    }

        @GetMapping(value = "/export")
        public void exportDonationsCsv(Authentication authentication, HttpServletResponse response) throws IOException {
                ensureAdmin(authentication);

                response.setContentType("text/csv");
                response.setHeader("Content-Disposition", "attachment; filename=donation_overview.csv");

                PrintWriter writer = response.getWriter();

                // CSV Header
                writer.println("campaignId,campaignTitle,category,targetAmount,raisedAmount,donationCount");

                campaignRepository.findAll().forEach(campaign -> {

                        List<Donation> donations = donationRepository.findByCampaignId(campaign.getId());

                        double raised = donations.stream()
                                        .mapToDouble(Donation::getAmount)
                                        .sum();

                        String line = String.format("%s,\"%s\",%s,%.2f,%.2f,%d",
                                        campaign.getId(),
                                        campaign.getTitle().replaceAll("\"","'"),
                                        campaign.getCategory(),
                                        campaign.getTargetAmount(),
                                        raised,
                                        donations.size());

                        writer.println(line);

                });

                writer.flush();
        }
}