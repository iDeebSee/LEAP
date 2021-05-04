package ap.be.backend;


import java.util.LinkedHashMap;

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

    @GetMapping("/{id}")
    public Capability readCapability(@PathVariable("id") String id) {
        return capabilityRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping("/add")
    public Capability createCapability(@RequestBody LinkedHashMap<Object, Object> data) {
        Capability newCapability = new Capability();
        System.out.println(data);
        newCapability.setName(data.get("name").toString());
        newCapability.setDescription(data.get("description").toString());
        if(data.containsKey("parentId"))
            newCapability.setParent(capabilityRepository.findById(data.get("parentId").toString()).get());
        return capabilityRepository.save(newCapability);
    }
    
    @PutMapping("/{id}")
    public Capability updateCapability(@PathVariable("id") String id, @RequestBody Capability newCapability) {
        Capability capability = capabilityRepository.findById(id).orElseThrow(RuntimeException::new);
                capability.setName(newCapability.getName());
                capability.setDescription(newCapability.getDescription());
                capability.setParent(newCapability.getParent());
                return capabilityRepository.save(capability);
    }

    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") String id) {
        capabilityRepository.findAllByParent(capabilityRepository.findById(id).orElseThrow(RuntimeException::new)).forEach(capX -> {
            if(capX.getLevel() < 3) {
                capabilityRepository.findAllByParent(capX).forEach(capY -> {
                    capabilityRepository.deleteById(capY.getId());
                });
            }
            capabilityRepository.deleteById(capX.getId());
        });
        capabilityRepository.deleteById(id);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        capabilityRepository.deleteAll();
    }
}
