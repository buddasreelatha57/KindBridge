package com.kindbridge.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.kindbridge.entity.User;
import com.kindbridge.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public AdminInitializer(UserRepository userRepository,
                            BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail("admin@kindbridge.com")) {

            User admin = User.builder()
                    .name("Admin")
                    .email("admin@kindbridge.com")
                    .password(encoder.encode("Admin@123"))
                    .phone("9999999999")
                    .role("ADMIN")
                    .createdAt(java.time.LocalDateTime.now().toString())
                    .build();

            userRepository.save(admin);

            System.out.println("Admin Created");
        }
    }
}