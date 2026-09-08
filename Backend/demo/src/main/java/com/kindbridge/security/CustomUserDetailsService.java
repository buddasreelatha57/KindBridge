package com.kindbridge.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.kindbridge.entity.User;
import com.kindbridge.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        String normalizedRole = user.getRole() == null
                ? "USER"
                : user.getRole().trim().toUpperCase().replaceFirst("^ROLE_", "");

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(normalizedRole)
                .build();
    }
}
