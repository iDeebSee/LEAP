package ap.be.backend.controllers;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.models.StrategyItem;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.StrategyItemRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StrategyItemController {

    @Autowired
    private StrategyItemRepository strategyItemRepository;

    /**
     * @return ophalen van alle strategysItems
     */
    @GetMapping("/strategyItem")
    public Iterable<StrategyItem> readStrategies() {
        return strategyItemRepository.findAll();
    }
    /**
     * @return ophalen van strategyItems per ID
     */
    @GetMapping("/strategyItem/{id}")
    public StrategyItem readStrategy(@PathVariable("id") String id) {
        return strategyItemRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    /**
     * @return voor het aanmaken van een stretagyItem 
     */

    @PostMapping("/strategyItem")
    public StrategyItem createStrategy(@RequestBody LinkedHashMap<Object, Object> data) {
        System.out.println(data);
        StrategyItem newStrategyItem = new StrategyItem();

        newStrategyItem.setName(data.get("name").toString());
        return strategyItemRepository.save(newStrategyItem);
    }
    /**
     * @return voor het updaten van een strategyItem 
     */
    @PutMapping("/strategyItem/{id}")
    public StrategyItem updStrategy(@PathVariable("id") String id, @RequestBody StrategyItem newStrategyItem) {
        StrategyItem strategy = strategyItemRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategyItem.getName().isBlank())
            strategy.setName(newStrategyItem.getName());
        return strategyItemRepository.save(strategy);
    }
    /**
     * @return voor het verwijderen van het geselecteerde  StrategyItem  
     */

    @DeleteMapping("/strategyItem/{id}")
    public ResponseEntity<MessageResponse> deleteStrategy(@PathVariable("id") String id) {

        if (strategyItemRepository.existsById(id)) {
            strategyItemRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted strategy item"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Item did not exist"));
        }
    }


}
