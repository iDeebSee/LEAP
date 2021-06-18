package ap.be.backend.controllers;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.models.Strategy;
import ap.be.backend.repositories.StrategyRepository;

@RestController
public class StrategyController {

    @Autowired
    private StrategyRepository strategyRepository;

    
    /** 
     * Itereert over elke strategie in de repository.
     * @return geeft alle strategiën terug.
     */
    @GetMapping("/strategy")
    public Iterable<Strategy> readStrategies() {
        return strategyRepository.findAll();
    }

    
    /** 
     * @param id id van de strategie die opgehaalt moet worden. 
     * @return geeft een specifieke strategie terug.
     */
    @GetMapping("/strategy/{id}")
    public Strategy readStrategy(@PathVariable("id") String id) {
        return strategyRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    
    /** 
     * Creatie van een nieuwe strategie.
     * @param data ingevulde strategie parameters.
     * @return slaat de nieuwe strategie op in de repository.
     */
    @PostMapping("/strategy")
    public Strategy createStrategy(@RequestBody LinkedHashMap<Object, Object> data) {
        Strategy newStrategy = new Strategy();

        newStrategy.setName(data.get("name").toString());
        return strategyRepository.save(newStrategy);
    }

    
    /** 
     * wijzigt een specifieke strategie op basis van de id.
     * @param newStrategy nieuwe strategie parameters.
     * @return Vervangt de oude parameters door de nieuwe.
     */
    @PutMapping("/strategy/{id}")
    public Strategy updateStrategy(@PathVariable("id") String id, @RequestBody Strategy newStrategy) {
        Strategy strategy = strategyRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategy.getName().isBlank())
            strategy.setName(newStrategy.getName());
        return strategyRepository.save(strategy);
    }

    
    /** 
     * Verwijdert een specifieke strategy op basis van id.
     * @param id id van de strategie die verwijdert moet worden.
     */
    @DeleteMapping("/strategy/{id}")
    public void deleteStrategy(@PathVariable("id") String id) {

        strategyRepository.deleteById(id);
    }

    /**
     * Zoekt naar een specifieke strategyItem die gelinkt is aan een strategy.
     * @param id gezochte strategyItem
     * @return de gezochte strategyItem.
     */
    @GetMapping("/strategy/{id}")
    public Strategy readStrategyItemList(@PathVariable("id") String id) {
        return strategyRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    /**
     * Wijzigt een bestaande strategyItem.
     * @param id de id van de strategyItem die gewijzigd moet worden.
     * @param newStrategy nieuwe parameters die de oude moeten vervangen.
     * @return de nieuwe parameters worden opgeslagen.
     */
    @PutMapping("/strategy/{id}")
    public Strategy updStrategy(@PathVariable("id") String id, @RequestBody Strategy newStrategy) {
        Strategy strategy = strategyRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategy.getName().isBlank())
            strategy.setName(newStrategy.getName());
        return strategyRepository.save(strategy);
    }


}
