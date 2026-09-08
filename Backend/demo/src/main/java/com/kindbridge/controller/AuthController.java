package com.kindbridge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.AuthResponse;
import com.kindbridge.dto.ChangePasswordRequest;
import com.kindbridge.dto.LoginRequest;
import com.kindbridge.dto.RegisterRequest;
import com.kindbridge.dto.UserProfileUpdateRequest;
import com.kindbridge.service.AuthService;

import org.springframework.security.core.Authentication;
import com.kindbridge.entity.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        if (response.getMessage().equals("Email already exists")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        if (!response.getMessage().equals("Login Successful")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {

        User user = authService.getProfile(authentication.getName());

        return ResponseEntity.ok(user);

    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            Authentication authentication,
            @RequestBody UserProfileUpdateRequest request
    ) {
        User updatedUser = authService.updateProfile(
                authentication.getName(),
                request
        );

        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/profile/password")
    public ResponseEntity<AuthResponse> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request
    ) {
        AuthResponse response = authService.changePassword(
                authentication.getName(),
                request
        );

        if (!response.getMessage().equals("Password Updated Successfully")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

}