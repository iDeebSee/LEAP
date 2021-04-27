package ap.be.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.jpa.Capability;
import ap.be.backend.jpa.CapabilityRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LEAPController {
    
    @Autowired
    private CapabilityRepository capabilityRepository;

    @GetMapping("/")
    public Iterable<Capability> readCapabilities() {
        return capabilityRepository.findAll();
    }

    @GetMapping("/{id}")
    public Capability readCapability(@PathVariable("id") Long id) {
        return capabilityRepository.findById(id).get();
    }
    
    @PostMapping("/add")
    public Capability createCapability(@RequestBody Capability capability) {
        return capabilityRepository.save(capability);
    }
    
    @PutMapping("/{id}")
    public Capability updateCapability(@PathVariable("id") Long id, @RequestBody Capability newCapability) {
        return capabilityRepository.findById(id)
            .map(capability -> {
                capability.setName(newCapability.getName());
                capability.setDescription(newCapability.getDescription());
                capability.setParent(newCapability.getParent());
                return capabilityRepository.save(capability);
            })
            .orElseGet(() -> {
                newCapability.setId(id);
                return capabilityRepository.save(newCapability);
            });
    }

    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") Long id) {
        capabilityRepository.deleteById(id);
    }
}
