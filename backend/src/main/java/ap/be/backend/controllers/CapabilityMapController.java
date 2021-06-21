package ap.be.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import ap.be.backend.models.Capability;
import ap.be.backend.repositories.CapabilityRepository;

public class CapabilityMapController {

    @Autowired
    private CapabilityRepository capabilityRepository;


    @GetMapping
    public Iterable<Capability> readCapabilities() {
        return capabilityRepository.findAll();

    }
    
}
