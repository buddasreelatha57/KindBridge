package com.kindbridge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kindbridge.dto.EducationSupportRequest;
import com.kindbridge.entity.EducationSupport;
import com.kindbridge.repository.EducationSupportRepository;

@Service
public class EducationSupportService {

    private final EducationSupportRepository repository;

    public EducationSupportService(EducationSupportRepository repository) {
        this.repository = repository;
    }

    public EducationSupport create(EducationSupportRequest request) {

        EducationSupport support = EducationSupport.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .beneficiaryName(request.getBeneficiaryName())
                .institution(request.getInstitution())
                .requiredAmount(request.getRequiredAmount())
                .collectedAmount(0)
                .imageUrl(request.getImageUrl())
                .status("ACTIVE")
                .createdAt(LocalDateTime.now().toString())
                .build();

        return repository.save(support);
    }

    public List<EducationSupport> getAll() {
        return repository.findAll();
    }
    
    public EducationSupport getById(String id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education Support Not Found"));

    }
}