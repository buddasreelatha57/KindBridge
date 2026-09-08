package com.kindbridge.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kindbridge.dto.ChangePasswordRequest;
import com.kindbridge.dto.RegisterRequest;
import com.kindbridge.dto.UserProfileUpdateRequest;
import com.kindbridge.entity.User;
import com.kindbridge.repository.UserRepository;
import com.kindbridge.security.JwtService;

import java.util.Optional;

import com.kindbridge.dto.AuthResponse;
import com.kindbridge.dto.LoginRequest;
import com.kindbridge.service.EmailService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtService jwtService,   EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .message("Email already exists")
                    .token(null)
                    .build();
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role("USER")
                .createdAt(LocalDateTime.now().toString())
                .build();

        User savedUser = userRepository.save(user);
        
        emailService.sendWelcomeEmail(
                savedUser.getEmail(),
                savedUser.getName()
        );

        return AuthResponse.builder()
                .message("Registration Successful")
                .token(null)
                .name(user.getName())
                .email(user.getEmail())
                .build();

                
    }
    
    public AuthResponse login(LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return AuthResponse.builder()
                    .message("Invalid Email")
                    .token(null)
                    .build();
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return AuthResponse.builder()
                    .message("Invalid Password")
                    .token(null)
                    .build();
        }

        String token = jwtService.generateToken(user.getEmail());
        String normalizedRole = (user.getRole() == null ? "USER" : user.getRole().trim())
                .toUpperCase();

        return AuthResponse.builder()
                .message("Login Successful")
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(normalizedRole)
                .build();
    }
    
    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, UserProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getOccupation() != null) {
            user.setOccupation(request.getOccupation());
        }

        return userRepository.save(user);
    }

    public AuthResponse changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return AuthResponse.builder()
                    .message("Invalid current password")
                    .token(null)
                    .build();
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return AuthResponse.builder()
                .message("Password Updated Successfully")
                .token(null)
                .build();
    }
}