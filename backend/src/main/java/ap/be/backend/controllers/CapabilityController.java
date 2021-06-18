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
     /**
     * @return ophalen van capabilties per environment id
     */

    @GetMapping("/caplist/{id}")
    public ResponseEntity<MessageResponse> readCapabilities(@PathVariable("id") String id) {
        if (environmentRepository.existsById(id)) {
            List<CapabilityReadDto> capabilities = new ArrayList<CapabilityReadDto>();
            environmentRepository.findById(id).get().getCapabityList().forEach(capability -> {
                //we zijn zeker dat deze capability bestaat in deze data set. dus cheken we daar niet of deze bestaat.
                capabilities.add(capabilityMapper.convertToReadDto(capabilityRepository.findById(capability).get()));
            });
            return ResponseEntity.ok(new MessageResponse("Got all capabilities!", capabilities));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find environment by ID"));
        }
        
    }
     /**
      * @return ophalen van een bepaalde capability.
      */
    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readCapability(@PathVariable("id") String id) {
        if(capabilityRepository.existsById(id)) {
            CapabilityReadDto capability = capabilityMapper.convertToReadDto(capabilityRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Got specified capability!", capability));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability"));
        }
    }

     /**
     * @return voor het aanmaken van een capabilty.
     */
    @PostMapping("/{envId}")
    public ResponseEntity<MessageResponse> createCapability(@PathVariable("envId") String envId, @Valid @RequestBody CapabilityCreateDto newCapability) {
        logger.info("Incoming Capability DTO:\n {}", newCapability);
        try {
            Capability capability = capabilityMapper.convertFromCreateDto(newCapability);
            logger.info("New capability:\n {}", capability);
            capabilityRepository.save(capability);
            environmentRepository.findById(envId).get().AddCapabilty(
                capabilityRepository.findByNameAndDescription(capability.getName(), capability.getDescription()).get().getId()
            );
            return ResponseEntity.ok(new MessageResponse("Successfully created capability!"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create capability"));
        }
    }

    /**
     * @return wijzigt een specifieke capability en slaat he dan op.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> updateCapability(@PathVariable("id") String id, @Valid @RequestBody CapabilityEditDto capabilityUpdate) {
        if(capabilityRepository.existsById(id)) {
            Capability updatedCapability = capabilityMapper.convertFromEditDto(capabilityUpdate);
            updatedCapability.setId(id);
            capabilityRepository.save(updatedCapability);
            return ResponseEntity.ok(new MessageResponse("Successfully updated capability!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find capability with that ID"));
        }
    }
    /**
     * Verwijdering van een capabilty per id, inclusief de cascading delete, dus eens een parent verwijderd word.
     * dan zullen de children ook mee verwijderd worden.
     */
    @DeleteMapping("/{envid}/{id}")
    public ResponseEntity<MessageResponse> deleteCapability(@PathVariable("envid") String envId, @PathVariable("id") String id) {
        if(capabilityRepository.existsById(id)) {
            environmentRepository.findById(id).get().DeleteCapability(id);
            capabilityRepository.findAllByParent(capabilityRepository.findById(id).get()).forEach(capX -> {
                if(capX.getLevel() < 3) {
                    capabilityRepository.findAllByParent(capX).forEach(capY -> {
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

