package ap.be.backend.controllers;

import java.util.LinkedHashMap;

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

@RestController
@RequestMapping("/bussinesproces")
public class BussinesProcesController {

    @Autowired
    private BussinesProcesRepository bussinesProcesRepository;

    /** 
     * Itereert over elke bedrijfsproces in de repository.
     * @return geeft alle bedrijfsproces terug.
     */
    @GetMapping
    public Iterable<BussinesProces> readBussinesProces() {
        return bussinesProcesRepository.findAll();
    }

    /** 
     * @param id id van de bedrijfsproces die opgehaalt moet worden. 
     * @return geeft een specifieke bedrijfsproces terug.
     */
    @GetMapping("/{id}")
    public BussinesProces readBussinesProces(@PathVariable("id") String id) {
        return bussinesProcesRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    /** 
     * Creatie van een nieuwe bedrijfsproces.
     * @param data ingevulde bedrijfsproces parameters.
     * @return slaat de nieuwe bedrijfsproces op in de repository.
     */
    @PostMapping
    public BussinesProces createBussinesProces(@RequestBody LinkedHashMap<Object, Object> data) {
        System.out.println(data);
        BussinesProces newBussinesProces = new BussinesProces();

        newBussinesProces.setName(data.get("name").toString());
        newBussinesProces.setDescription(data.get("description").toString());
        
        return bussinesProcesRepository.save(newBussinesProces);
    }

    /** 
     * wijzigt een specifieke bedrijfsproces op basis van de id.
     * @param newBussineProces nieuwe bedrijfsproces parameters.
     * @return Vervangt de oude parameters door de nieuwe.
     */
    @PutMapping("/{id}")
    public BussinesProces updBussinesProces(@PathVariable("id") String id, @RequestBody BussinesProces newBussineProces) {
        BussinesProces bussinesProces = bussinesProcesRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newBussineProces.getName().isBlank())
            bussinesProces.setName(newBussineProces.getName());
            bussinesProces.setDescription(newBussineProces.getDescription());

        return bussinesProcesRepository.save(bussinesProces);
    }

     /** 
     * Verwijdert een specifieke bedrijfsproces op basis van id.
     * @param id id van de bedrijfsproces die verwijdert moet worden.
     * @return een statusbericht
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBussinesProces(@PathVariable("id") String id) {

        if (bussinesProcesRepository.existsById(id)) {
            bussinesProcesRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted bussines proces "));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Item did not exist"));
        }
    }


}
