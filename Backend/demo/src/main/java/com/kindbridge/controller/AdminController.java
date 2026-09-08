package com.kindbridge.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.kindbridge.dto.AdminDashboardResponse;
import com.kindbridge.dto.AdminUserDTO;
import com.kindbridge.entity.User;
import com.kindbridge.repository.UserRepository;
import com.kindbridge.service.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    private void ensureAdmin(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        String role = user.getRole() == null ? "USER" : user.getRole().trim().toUpperCase().replaceFirst("^ROLE_", "");

        if (!"ADMIN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required");
        }
    }

    @GetMapping("/total-donations")
    public long getTotalDonations(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getTotalDonations();
    }

    @GetMapping("/total-users")
    public long getTotalUsers(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getTotalUsers();
    }

    @GetMapping("/total-supports")
    public long getTotalSupports(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getTotalSupports();
    }

    @GetMapping("/total-success-stories")
    public long getTotalSuccessStories(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getTotalSuccessStories();
    }

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getDashboardStats();
    }

    // ==============================
    // Get All Users with Donation Stats
    // ==============================

    @GetMapping("/users")
    public List<AdminUserDTO> getUsers(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getAllUsers();
    }

    @GetMapping("/users/export")
    public void exportUsersCsv(Authentication authentication, HttpServletResponse response) throws IOException {
        ensureAdmin(authentication);

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");

        PrintWriter writer = response.getWriter();

        // header
        writer.println("id,name,email,phone,role,createdAt,donationCount,totalDonated");

        adminService.getAllUsers().forEach(u -> {
            String line = String.format("%s,\"%s\",%s,%s,%s,\"%s\",%d,%.2f",
                u.getId() == null ? "" : u.getId(),
                u.getName() == null ? "" : u.getName().replaceAll("\"","'"),
                u.getEmail() == null ? "" : u.getEmail(),
                u.getPhone() == null ? "" : u.getPhone(),
                u.getRole() == null ? "" : u.getRole(),
                u.getCreatedAt() == null ? "" : u.getCreatedAt(),
                u.getDonationCount(),
                u.getTotalDonated());

            writer.println(line);
        });

        writer.flush();
    }

}