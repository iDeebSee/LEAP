package ap.be.backend.controllers;


import java.util.ArrayList;
import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.repositories.List;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class LEAPController {
    
    @Autowired
    private CapabilityRepository capabilityRepository;

    @Autowired
    private EnvironmentRepository envirenmentRepository;

    @GetMapping("/")
    public Iterable<Capability> readCapabilities() {
        return capabilityRepository.findAll();
    }

    @GetMapping("/{id}")
    public Capability readCapability(@PathVariable("id") String id) {
        return capabilityRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping("/")
    public Capability createCapability(@RequestBody LinkedHashMap<Object, Object> data) {
        Capability newCapability = new Capability();

        newCapability.setName(data.get("name").toString());
        newCapability.setDescription(data.get("description").toString());
        if(data.containsKey("parentId"))
            newCapability.setParent(capabilityRepository.findById(data.get("parentId").toString()).get());

        return capabilityRepository.save(newCapability);
    }
    
    @PutMapping("/{id}")
    public Capability updateCapability(@PathVariable("id") String id, @RequestBody LinkedHashMap<Object, Object> data) {
        Capability capability = capabilityRepository.findById(id).orElseThrow(RuntimeException::new);

        capability.setName(data.get("name").toString());
        capability.setDescription(data.get("description").toString());
        if(data.containsKey("parentId"))
            capability.setParent(capabilityRepository.findById(data.get("parentId").toString()).get());

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

    @GetMapping("/environment")
    public Iterable<Environment> readEnvironment() {
        return envirenmentRepository.findAll();
    }
    @GetMapping("/environment/{id}")
    public Environment readenvironment(@PathVariable("id") String id) {
        return envirenmentRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @PostMapping("/environment")
    public Environment createEnvironment(@RequestBody LinkedHashMap<Object, Object> data) {
        Environment newEnvironment = new Environment();

        newEnvironment.setName(data.get("name").toString());
        newEnvironment.setDescription(data.get("description").toString());
        

        return envirenmentRepository.save(newEnvironment);
    }
    @PutMapping("/environment/{id}")
    public Environment updatEnvironment(@PathVariable("id") String id, @RequestBody LinkedHashMap<Object, Object> data) {
        Environment environment = envirenmentRepository.findById(id).orElseThrow(RuntimeException::new);

        environment.setName(data.get("name").toString());
        environment.setDescription(data.get("description").toString());
        

        return envirenmentRepository.save(environment);
    }
    @DeleteMapping("/environment/{id}")
    public void deleteEnvironment(@PathVariable("id") String id) {
        
            
        envirenmentRepository.deleteById(id);
    }
  //ophalen CapList
    
    @GetMapping("/environment/{id}/caplist/")
    public ArrayList<String> readCapList(@PathVariable("id") String id) {
        return envirenmentRepository.findCapList(envirenmentRepository.findById(id));
    }
    
    @PutMapping("/environment/{id}/caplist/")
    public Environment updateCapList(@PathVariable("id") String id, @RequestBody Capability data) {
        Environment environment = envirenmentRepository.findById(id).orElseThrow(RuntimeException::new);
        ArrayList<String> dataList= new ArrayList<>();
        dataList.add(data.getId());
        environment.setCapabityList(dataList);
        
        return envirenmentRepository.save(environment);
    }
    
    

}
