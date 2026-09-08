package com.kindbridge.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.kindbridge.security.JwtAuthenticationFilter;


@Configuration
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final AuthenticationProvider authenticationProvider;



    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider
    ) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;

    }





    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

            // Enable CORS
            .cors(cors -> {})


            // Disable CSRF for REST API
            .csrf(csrf -> csrf.disable())



            // JWT authentication is stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )



            .authorizeHttpRequests(auth -> auth


                // Public APIs
                .requestMatchers(
                        "/api/auth/login",
                        "/api/auth/register",
                        "/api/support/**",
                        "/api/campaigns/**"
                )
                .permitAll()
                .requestMatchers(HttpMethod.GET, "/api/campaign-updates/**")
                .permitAll()
                .requestMatchers("/api/admin/**")
                .authenticated()
                .requestMatchers("/api/users/**")
                .authenticated()


                // Everything else requires JWT
                .anyRequest()
                .authenticated()

            )



            // JWT Authentication Provider
            .authenticationProvider(
                    authenticationProvider
            )



            // JWT Filter before username/password filter
            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );



        return http.build();

    }







    @Bean
    CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration configuration =
                new CorsConfiguration();



        configuration.setAllowedOrigins(
                List.of(
                    "http://localhost:5173",
                    "http://127.0.0.1:5173"
                )
        );



        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
                )
        );



        configuration.setAllowedHeaders(
                List.of("*")
        );



        configuration.setAllowCredentials(true);



        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();



        source.registerCorsConfiguration(
                "/**",
                configuration
        );



        return source;

    }

}


