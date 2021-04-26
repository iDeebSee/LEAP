package ap.be.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.jpa.Capability;
import ap.be.backend.jpa.CapabilityRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class LEAPController {
    
    @Autowired
    private CapabilityRepository capabilityRepository;

    @GetMapping("/")
    public Iterable<Capability> readCapabilities() {
        return capabilityRepository.findAll();
    }
    
}
