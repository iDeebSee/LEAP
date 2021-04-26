package ap.be.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import ap.be.backend.jpa.Capability;
import ap.be.backend.jpa.CapabilityRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class LEAPController {

    private final String baseURL = "localhost:/3000/"; 
    
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
    public RedirectView createCapability(@RequestBody Capability capability) {
        capabilityRepository.save(capability);
        
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(baseURL + capability.getId());
        return redirectView;
    }
    
    @PutMapping("/{id}")
    public RedirectView updateCapability(@PathVariable("id") Long id, @RequestBody Capability newCapability) {
        capabilityRepository.findById(id)
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
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(baseURL + id);
            return redirectView;
    }

    @DeleteMapping("/{id}")
    public RedirectView deleteCapability(@PathVariable("id") Long id) {
        capabilityRepository.deleteById(id);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(baseURL);
        return redirectView;
    }
}
