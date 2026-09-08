package com.kindbridge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.dto.AdminDashboardResponse;
import com.kindbridge.dto.AdminUserDTO;
import com.kindbridge.entity.Donation;
import com.kindbridge.entity.User;
import com.kindbridge.repository.DonationRepository;
import com.kindbridge.repository.EducationSupportRepository;
import com.kindbridge.repository.SuccessStoryRepository;
import com.kindbridge.repository.UserRepository;

@Service
public class AdminService {

    private final DonationRepository donationRepository;
    private final UserRepository userRepository;
    private final EducationSupportRepository supportRepository;
    private final SuccessStoryRepository successStoryRepository;

    public AdminService(
            DonationRepository donationRepository,
            UserRepository userRepository,
            EducationSupportRepository supportRepository,
            SuccessStoryRepository successStoryRepository) {

        this.donationRepository = donationRepository;
        this.userRepository = userRepository;
        this.supportRepository = supportRepository;
        this.successStoryRepository = successStoryRepository;
    }

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    public long getTotalDonations() {
        return donationRepository.count();
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalSupports() {
        return supportRepository.count();
    }

    public long getTotalSuccessStories() {
        return successStoryRepository.count();
    }

    public AdminDashboardResponse getDashboardStats() {

        List<Donation> donations = donationRepository.findAll();

        long totalUsers = userRepository.count();

        long totalDonations = donations.size();

        long totalSupports = supportRepository.count();

        long totalSuccessStories = successStoryRepository.count();

        double totalDonationAmount = donations.stream()
                .mapToDouble(Donation::getAmount)
                .sum();

        long activeDonors = donations.stream()
                .map(Donation::getDonorEmail)
                .filter(email -> email != null && !email.isBlank())
                .distinct()
                .count();

        double averageDonation = totalDonations == 0
                ? 0
                : totalDonationAmount / totalDonations;

        long completedSupports = supportRepository.findAll()
                .stream()
                .filter(support ->
                        support.getCollectedAmount() >= support.getRequiredAmount())
                .count();

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalDonations(totalDonations)
                .totalDonationAmount(totalDonationAmount)
                .activeDonors(activeDonors)
                .totalSupports(totalSupports)
                .completedSupports(completedSupports)
                .totalSuccessStories(totalSuccessStories)
                .averageDonation(averageDonation)
                .build();
    }

    // ==========================================
    // Admin Users
    // ==========================================

    public List<AdminUserDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {

            List<Donation> donations =
                    donationRepository.findByDonorEmail(user.getEmail());

            double totalDonated = donations.stream()
                    .mapToDouble(Donation::getAmount)
                    .sum();

            return AdminUserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .role(user.getRole())
                    .createdAt(user.getCreatedAt())
                    .donationCount(donations.size())
                    .totalDonated(totalDonated)
                    .build();

        }).toList();
    }
}