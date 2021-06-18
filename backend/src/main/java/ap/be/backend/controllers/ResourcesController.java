
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

    /**
     * Itereert over elke resource.
     * @return geeft alle resources terug.
     */
    @GetMapping("/")
    public Iterable<Resource> readResources() {
        return resourcesRepository.findAll();
    }

    /**
     * Zoekt een specifieke resource.
     * @param id id van de specifieke resource die teruggegeven moet worden.
     * @return geeft de specifieke resource terug op basis van id.
     */
    @GetMapping("/{id}")
    public Resource readResources(@PathVariable("id") String id) {
        return resourcesRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    /**
     * Creërt een nieuwe instantie van klasse environment en voegt die toe aan de repository.
     * @param Resources ingave van nodige parameters om een resource toe te voegen.
     * @return slaat de nieuwe instantie op in de repository.
     */
    @PostMapping("/")
    public Resource createCapability(@RequestBody Resource Resources) {
        return resourcesRepository.save(Resources);
    }

    /**
     * Wijzigt een specifieke resource op basis van id en slaat ze daarna op.
     * @param id id van de resource die gewijzigd moet worden.
     * @param newResources gewijzigde resource.
     * @return slaat de gewijzgde resource op.
     */
    @PutMapping("/{id}")
    public Resource updateCapability(@PathVariable("id") String id, @RequestBody Resource newResources) {
        Resource resources = resourcesRepository.findById(id).orElseThrow(RuntimeException::new);
        resources.setName(newResources.getName());
        resources.setDescription(newResources.getDescription());
        return resourcesRepository.save(resources);
    }

    /**
     * Verwijdert een specifieke resource.
     * @param id id van de resource die verwijdert moet worden.
     * @return verwijdert de capability uit repository.
     */
    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") String id) {
        resourcesRepository.deleteById(id);
    }

    /**
     * verwijdert alle resources uit de repository.
     */
    @DeleteMapping("/")
    public void deleteAll() {
        resourcesRepository.deleteAll();
    }

}
