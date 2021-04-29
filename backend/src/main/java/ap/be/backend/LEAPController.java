package ap.be.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.Repositories.CapabilityRepository;
import ap.be.backend.models.Capability;

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

    @GetMapping("/{name}")
    public Capability readCapability(@PathVariable("name") String name) {
        return capabilityRepository.findByName(name);
    }
    
    @PostMapping("/add")
    public Capability createCapability(@RequestBody Capability capability) {
        return capabilityRepository.save(capability);
    }
    
    @PutMapping("/{name}")
    public Capability updateCapability(@PathVariable("name") String name, @RequestBody Capability newCapability) {
        Capability capability = capabilityRepository.findByName(name);
                capability.setName(newCapability.getName());
                capability.setDescription(newCapability.getDescription());
                capability.setParent(newCapability.getParent());
                return capabilityRepository.save(capability);
    }

    @DeleteMapping("/{name}")
    public void deleteCapability(@PathVariable("name") String name) {
        capabilityRepository.deleteByName(name);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        capabilityRepository.deleteAll();
    }
}
