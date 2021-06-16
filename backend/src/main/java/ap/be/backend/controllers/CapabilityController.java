package ap.be.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.services.mappers.CapabilityMapper;
import ap.be.backend.dtos.createdtos.CapabilityCreateDto;
import ap.be.backend.dtos.editdtos.CapabilityEditDto;
import ap.be.backend.dtos.readdtos.CapabilityReadDto;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.payload.response.MessageResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


//improve overall error checking in routes for more specific error messages
//for example: invalid request body, failed to map, etc
//return new capability when caching is implemented to prevent /capabilities/all API call being needed
@RestController
@RequestMapping("/capability")
public class CapabilityController {

    private static final Logger logger = LoggerFactory.getLogger(CapabilityController.class);
    
    @Autowired
    private CapabilityRepository capabilityRepository;

    @Autowired
    private CapabilityMapper capabilityMapper;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @GetMapping("/caplist/{envId}")
    public ResponseEntity<MessageResponse> readCapabilities(@PathVariable("envId") String envId) {
        if (environmentRepository.existsById(envId)) {
            List<CapabilityReadDto> capabilities = new ArrayList<CapabilityReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if(environment.getCapabilityList().size() > 0) {
                environment.getCapabilityList().forEach(capability -> {
                    if(capabilityRepository.existsById(capability.getId())) {
                        capabilities.add(capabilityMapper.convertToReadDto(capabilityRepository.findById(capability.getId()).get()));
                    }
                });
            }
            return ResponseEntity.ok(new MessageResponse("Got all capabilities!", capabilities));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find environment by ID"));
        }
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readCapability(@PathVariable("id") String id) {
        if(capabilityRepository.existsById(id)) {
            CapabilityReadDto capability = capabilityMapper.convertToReadDto(capabilityRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Got specified capability!", capability));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability"));
        }
    }
    
    @PostMapping("/{envId}")
    public ResponseEntity<MessageResponse> createCapability(@PathVariable("envId") String envId, @Valid @RequestBody CapabilityCreateDto newCapability) {
        try {
            Capability capability = capabilityMapper.convertFromCreateDto(newCapability);
            capabilityRepository.save(capability);
            Environment environment = environmentRepository.findById(envId).get();
            environment.AddCapabilty(
                capabilityRepository.findByNameAndDescription(capability.getName(), capability.getDescription()).get()
            );
            environmentRepository.save(environment);
            return ResponseEntity.ok(new MessageResponse("Successfully created capability!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create capability"));
        }
    }
    
    @PutMapping("/{envid}/{id}")
    public ResponseEntity<MessageResponse> updateCapability(@PathVariable("envid") String envId, @PathVariable("id") String id, @Valid @RequestBody CapabilityEditDto capabilityUpdate) {
        if(capabilityRepository.existsById(id)) {

            Capability updatedCapability = capabilityMapper.convertFromEditDto(capabilityUpdate);
            logger.info("{}", updatedCapability);
            updatedCapability.setId(id);
            capabilityRepository.save(updatedCapability);

            Environment environment = environmentRepository.findById(envId).get();
            logger.info("{}", capabilityRepository.findById(id).get());
            environment.editCapability(
                capabilityRepository.findById(id).get()
            );
            environmentRepository.save(environment);
            return ResponseEntity.ok(new MessageResponse("Successfully updated capability!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability with that ID"));
        }
    }

    @DeleteMapping("/{envid}/{id}")
    public ResponseEntity<MessageResponse> deleteCapability(@PathVariable("envid") String envId, @PathVariable("id") String id) {
        if(capabilityRepository.existsById(id)) {
            Capability capabilityToDelete = capabilityRepository.findById(id).get();
            capabilityRepository.findAllByParent(capabilityToDelete).forEach(capX -> {
                if(capX.getLevel() < 3) {
                    capabilityRepository.findAllByParent(capX).forEach(capY -> {
                        capabilityRepository.deleteById(capY.getId());
                    });
                }
                capabilityRepository.deleteById(capX.getId());
            });
            capabilityRepository.deleteById(id);

            Environment environment = environmentRepository.findById(envId).get();
            environment.DeleteCapability(capabilityToDelete);
            environmentRepository.save(environment);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted capability and all its children!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability with that ID"));
        }
    }
}

