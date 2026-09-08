
package com.kindbridge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.EducationSupportRequest;
import com.kindbridge.entity.EducationSupport;
import com.kindbridge.service.EducationSupportService;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationSupportController {

    private final EducationSupportService service;

    public EducationSupportController(EducationSupportService service) {
        this.service = service;
    }

    @PostMapping
    public EducationSupport create(@RequestBody EducationSupportRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<EducationSupport> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public EducationSupport getById(@PathVariable String id) {
        return service.getById(id);
    }
}