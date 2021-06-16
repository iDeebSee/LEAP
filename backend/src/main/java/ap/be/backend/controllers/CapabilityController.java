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

    @GetMapping("/capabilities/{envId}")
    public ResponseEntity<MessageResponse> readCapabilities(@PathVariable("envId") String envId) {
        if (environmentRepository.existsById(envId)) {
            List<CapabilityReadDto> capabilities = new ArrayList<CapabilityReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if(capabilityRepository.existsByEnvironment(environment)) {
                capabilityRepository.findAllByEnvironment(environment).get().forEach(capability -> {
                    capabilities.add(capabilityMapper.convertToReadDto(capability));
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
    
    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCapability(@Valid @RequestBody CapabilityCreateDto newCapability) {
        try {
            Capability capability = capabilityMapper.convertFromCreateDto(newCapability);
            capabilityRepository.save(capability);
            return ResponseEntity.ok(new MessageResponse("Successfully created capability!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create capability"));
        }
    }
    
    @PutMapping("/")
    public ResponseEntity<MessageResponse> updateCapability(@Valid @RequestBody CapabilityEditDto capabilityUpdate) {
        if(capabilityRepository.existsById(capabilityUpdate.getId())) {

            Capability updatedCapability = capabilityMapper.convertFromEditDto(capabilityUpdate);
            capabilityRepository.save(updatedCapability);

            return ResponseEntity.ok(new MessageResponse("Successfully updated capability!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability with that ID"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteCapability(@PathVariable("id") String id) {
        if(capabilityRepository.existsById(id)) {
            Capability capabilityToDelete = capabilityRepository.findById(id).get();
            capabilityRepository.findAllByParent(capabilityToDelete).get().forEach(capX -> {
                if(capX.getLevel() < 3) {
                    capabilityRepository.findAllByParent(capX).get().forEach(capY -> {
                        capabilityRepository.deleteById(capY.getId());
                    });
                }
                capabilityRepository.deleteById(capX.getId());
            });
            capabilityRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted capability and all its children!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability with that ID"));
        }
    }
}

