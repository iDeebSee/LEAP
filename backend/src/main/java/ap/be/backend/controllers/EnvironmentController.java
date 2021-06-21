package ap.be.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.services.mappers.EnvironmentMapper;
import ap.be.backend.dtos.createdtos.EnvironmentCreateDto;
import ap.be.backend.dtos.editdtos.EnvironmentEditDto;
import ap.be.backend.dtos.readdtos.EnvironmentReadDto;
import ap.be.backend.models.Environment;
import ap.be.backend.payload.response.MessageResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/environment")
public class EnvironmentController {

    private static final Logger logger = LoggerFactory.getLogger(CapabilityController.class);

    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired
    private EnvironmentMapper environmentMapper;

    /**
     * Itereert over elke environment en slaat ze op in een lijst.
     * @return geeft alle environments terug.
     */
    @GetMapping("/all")
    public ResponseEntity<MessageResponse> getAllEnvironments() {
        try {
            List<EnvironmentReadDto> environments = new ArrayList<EnvironmentReadDto>();
            environmentRepository.findAll().forEach(environment -> {
                environments.add(environmentMapper.convertToReadDto(environment));
            });
            return ResponseEntity.ok(new MessageResponse("Successfully got all environments!", environments));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Exception when mapping environments to DTO"));
        }
    }
    /**
     * Zoekt een environment en controleert of het bestaat om ze dan terug te geven.
     * @param id id van een specifieke environement die terug gegeven moet worden.
     * @return een specifieke environment op basis van id en de een statusbericht.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> getEnvironemnt(@PathVariable("id") String id) {
        if(environmentRepository.existsById(id)) {
            Environment environment = environmentRepository.findById(id).get();
            return ResponseEntity.ok(new MessageResponse("Successfully found environment!", environmentMapper.convertToReadDto(environment)));
        } else {   
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find environment with that ID"));
        }
    }

    /**
     * Creërt een nieuwe instantie van klasse environment en voegt die toe aan de repository.
     * @param newEnvironment ingave van nodige parameters om een environment toe te voegen.
     * @return geeft een bericht terug met de status van de creatie.
     */
    @PostMapping("/")
    public ResponseEntity<MessageResponse> createEnvironment(@Valid @RequestBody EnvironmentCreateDto newEnvironment) {
        logger.info("{}", newEnvironment);
        try {
            Environment environment = environmentMapper.convertFromCreateDto(newEnvironment);
            environmentRepository.save(environment);
            return ResponseEntity.ok(new MessageResponse("Successfully created new environment!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create new environment"));
        }
    }
    /**
     * Wijzigt een specifieke environment en slaat ze daarna op.
     * @param id id van de environment die gewijzigd moet worden.
     * @param updatedEnvironment gewijzigde environment.
     * @return geeft een bericht terug met de status van de wijziging.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> updatEnvironment(@PathVariable("id") String id, @Valid @RequestBody EnvironmentEditDto updatedEnvironment) {
        if (environmentRepository.existsById(id)) {
            Environment environment = environmentMapper.convertFromEditDto(updatedEnvironment);
            environment.setId(id);
            environmentRepository.save(environment);
            return ResponseEntity.ok(new MessageResponse("Successfully updated new environment!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to update environment"));
        }
    }
    /**
     * Verwijdert een specifieke environment.
     * @param id id van de environment die verwijdert moet worden.
     * @return geeft een bericht terug met de status van de verwijdering.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteEnvironment(@PathVariable("id") String id) {
        if(environmentRepository.existsById(id)) {
            environmentRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted environment!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find environment by that ID"));
        }
    }
}
