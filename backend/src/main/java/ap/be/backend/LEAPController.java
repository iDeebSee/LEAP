package ap.be.backend;


import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvirenmentRepository;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.models.Strategy;

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
    private EnvirenmentRepository envirenmentRepository;
    
    @Autowired
    private StrategyRepository strategyRepository;

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
        System.out.println(envirenmentRepository.findAll());
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
    
    


    @GetMapping("/strategy")
    public Iterable<Strategy> readStrategies() {
        return strategyRepository.findAll();
    }

    @GetMapping("/strategy/{id}")
    public Strategy readStrategy(@PathVariable("id") String id) {
        return strategyRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/strategy")
    public Strategy createStrategy(@RequestBody LinkedHashMap<Object, Object> data) {
        Strategy newStrategy = new Strategy();

        newStrategy.setName(data.get("name").toString());
        return strategyRepository.save(newStrategy);
    }

    @PutMapping("/strategy/{id}")
    public Strategy updStrategy(@PathVariable("id") String id, @RequestBody Strategy newStrategy) {
        Strategy strategy = strategyRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategy.getName().isBlank())
            strategy.setName(newStrategy.getName());
        return strategyRepository.save(strategy);
    }

    @DeleteMapping("/strategy/{id}")
    public void deleteStrategy(@PathVariable("id") String id) {

        strategyRepository.deleteById(id);
    }


}
