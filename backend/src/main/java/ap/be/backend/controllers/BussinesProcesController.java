package ap.be.backend.controllers;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.models.BussinesProces;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.BussinesProcesRepository;
import ap.be.backend.dtos.createdtos.BussinesProcesCreateDto;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.services.mappers.BussinesProcesMapper;
import ap.be.backend.dtos.editdtos.BussinesProcesEditDto;

import ap.be.backend.dtos.readdtos.BussinesProcesReadDto;
import ap.be.backend.models.Environment;

@RestController
@RequestMapping("/bussinesproces")
public class BussinesProcesController {

    @Autowired
    private BussinesProcesRepository bussinesProcesRepository;


    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired
    private BussinesProcesMapper bussinesProcesMapper;

    /** 
     * Itereert over elke bedrijfsproces in de repository.
     * @return geeft alle bedrijfsproces terug.
     */
   
    /** 
     * @param id id van de bedrijfsproces die opgehaalt moet worden. 
     * @return geeft een specifieke bedrijfsproces terug.
     */



    /** 
     * Creatie van een nieuwe bedrijfsproces.
     * @param data ingevulde bedrijfsproces parameters.
     * @return slaat de nieuwe bedrijfsproces op in de repository.
     */
    

    /** 
     * wijzigt een specifieke bedrijfsproces op basis van de id.
     * @param newBussineProces nieuwe bedrijfsproces parameters.
     * @return Vervangt de oude parameters door de nieuwe.
     */
    

    @GetMapping("/{envId}")
    public ResponseEntity<MessageResponse> readBussinesProcesses(@PathVariable("envId") String envId) {
        try {
            List<BussinesProcesReadDto> bussineprocesses = new ArrayList<BussinesProcesReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if (bussinesProcesRepository.existsByEnvironment(environment)) {
                bussinesProcesRepository.findAllByEnvironment(environment).get().forEach(BussinesProces -> {
                    bussineprocesses.add(bussinesProcesMapper.convertToReadDto(BussinesProces));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all bussinesprocesses!", bussineprocesses));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get bussines processes"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readbussinesproces(@PathVariable("id") String id) {
        if(bussinesProcesRepository.existsById(id)) {
            BussinesProcesReadDto bussinesproces = bussinesProcesMapper.convertToReadDto(bussinesProcesRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Successfully found bussinesproces", bussinesproces));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find business process with that ID"));
        }
       
    }

     /** 
     * Verwijdert een specifieke bedrijfsproces op basis van id.
     * @param id id van de bedrijfsproces die verwijdert moet worden.
     * @return een statusbericht
     */
    

    @PostMapping("/")
        public ResponseEntity<MessageResponse> createResource(@Valid @RequestBody BussinesProcesCreateDto bussinesProcesCreateDto) {
            try {
                BussinesProces newbussinesproces = bussinesProcesMapper.convertFromCreateDto(bussinesProcesCreateDto);
                bussinesProcesRepository.save(newbussinesproces);
                return ResponseEntity.ok(new MessageResponse("Successfully created bussinesproces"));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Failed to create bussinesproces"));
            }
        }

        @PutMapping("/")
            public ResponseEntity<MessageResponse> updateResource(@Valid @RequestBody BussinesProcesEditDto bussinesProcesEditDto) {
                if(bussinesProcesRepository.existsById(bussinesProcesEditDto.getId())) {
                    BussinesProces updateBussinesProces = bussinesProcesMapper.convertFromEditDto(bussinesProcesEditDto);
                    bussinesProcesRepository.save(updateBussinesProces);
                    return ResponseEntity.ok(new MessageResponse("Successfully updated bussinesproces"));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Failed to find bussinesproces with that ID"));
                }
            }

            @DeleteMapping("/{id}")
                public ResponseEntity<MessageResponse> deleteBussinesProcesses(@PathVariable("id") String id) {
                    if(bussinesProcesRepository.existsById(id)) {
                        bussinesProcesRepository.deleteById(id);
                        return ResponseEntity.ok(new MessageResponse("Successfully deleted bussinesproces"));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("Failed to find bussinesproces with that ID"));
                    }
                }

}
