
package ap.be.backend.controllers;
import ap.be.backend.repositories.ResourceRepository;
import ap.be.backend.models.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("resources")
@RestController
public class ResourcesController {
    @Autowired
    private ResourceRepository resourcesRepository;

    @GetMapping("/")
    public Iterable<Resource> readResources() {
        return resourcesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Resource readResources(@PathVariable("id") String id) {
        return resourcesRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/")
    public Resource createCapability(@RequestBody Resource Resources) {
        return resourcesRepository.save(Resources);
    }

    @PutMapping("/{id}")
    public Resource updateCapability(@PathVariable("id") String id, @RequestBody Resource newResources) {
        Resource resources = resourcesRepository.findById(id).orElseThrow(RuntimeException::new);
        resources.setName(newResources.getName());
        resources.setDescription(newResources.getDescription());
        return resourcesRepository.save(resources);
    }

    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") String id) {
        resourcesRepository.deleteById(id);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        resourcesRepository.deleteAll();
    }

}
