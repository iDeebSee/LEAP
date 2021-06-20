
package ap.be.backend.controllers;
import ap.be.backend.dtos.createdtos.ResourceCreateDto;

import ap.be.backend.dtos.editdtos.ResourceEditDto;

import ap.be.backend.dtos.readdtos.ResourceReadDto;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;

import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.repositories.ResourceRepository;
import ap.be.backend.models.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ap.be.backend.services.mappers.ResourceMapper;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/resources")
@RestController
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired
    private ResourceMapper resourceMapper;

    @GetMapping("/{envId}/")
    // public Iterable<Resource> readResources() {
    //     return resourcesRepository.findAll();
    // }
    public ResponseEntity<MessageResponse> readResources(@PathVariable("envId") String envId) {
        try {
            List<ResourceReadDto> resources = new ArrayList<ResourceReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if (resourceRepository.existsByEnvironment(environment)) {
                resourceRepository.findAllByEnvironment(environment).get().forEach(resource -> {
                    resources.add(resourceMapper.convertToReadDto(resource));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all resources!", resources));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get resources"));
        }
    }

    @GetMapping("/{id}")
    // public Resource readResources(@PathVariable("id") String id) {
    //     return resourcesRepository.findById(id).orElseThrow(RuntimeException::new);
    // }
    public ResponseEntity<MessageResponse> readResource(@PathVariable("id") String id) {
        if(resourceRepository.existsById(id)) {
            ResourceReadDto resource = resourceMapper.convertToReadDto(resourceRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Successfully found resource", resource));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find resource with that ID"));
        }
    }

    @PostMapping("/")
//    public Resource createCapability(@RequestBody Resource resources) {
//        return resourceRepository.save(resources);
//    }
    public ResponseEntity<MessageResponse> createResource(@Valid @RequestBody ResourceCreateDto resourceCreateDto) {
        try {
            Resource newResource = resourceMapper.convertFromCreateDto(resourceCreateDto);
            resourceRepository.save(newResource);
            return ResponseEntity.ok(new MessageResponse("Successfully created resource"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create resource"));
        }
    }

    @PutMapping("/")
//    public Resource updateCapability(@PathVariable("id") String id, @RequestBody Resource newResources) {
//        Resource resources = resourceRepository.findById(id).orElseThrow(RuntimeException::new);
//        resources.setName(newResources.getName());
//        resources.setDescription(newResources.getDescription());
//        return resourceRepository.save(resources);
//    }
    public ResponseEntity<MessageResponse> updateResource(@Valid @RequestBody ResourceEditDto resourceEditDto) {
        if(resourceRepository.existsById(resourceEditDto.getId())) {
            Resource updatedResource = resourceMapper.convertFromEditDto(resourceEditDto);
            resourceRepository.save(updatedResource);
            return ResponseEntity.ok(new MessageResponse("Successfully updated resource"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find resource with that ID"));
        }
    }

    @DeleteMapping("/{id}")
//    public void deleteCapability(@PathVariable("id") String id) {
//        resourceRepository.deleteById(id);
//    }
    public ResponseEntity<MessageResponse> deleteResource(@PathVariable("id") String id) {
        if(resourceRepository.existsById(id)) {
            resourceRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted resource"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find resource with that ID"));
        }
    }

    @DeleteMapping("/")
    public void deleteAll() {
        resourceRepository.deleteAll();
    }

}
