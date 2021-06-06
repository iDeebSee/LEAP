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

    @GetMapping("/strategy")
    public Iterable<Strategy> readStrategies() {
        return strategyRepository.findAll();
    }

    @GetMapping("/strategy/{id}")
    public Strategy readStrategy(@PathVariable("id") String id) {
        return strategyRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/strategy")
    public Strategy createStrategy(@RequestBody LinkedHashMap<Object, Object> data) {
        Strategy newStrategy = new Strategy();

        newStrategy.setName(data.get("name").toString());
        return strategyRepository.save(newStrategy);
    }

    @PutMapping("/strategy/{id}")
    public Strategy updStrategy(@PathVariable("id") String id, @RequestBody Strategy newStrategy) {
        Strategy strategy = strategyRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategy.getName().isBlank())
            strategy.setName(newStrategy.getName());
        return strategyRepository.save(strategy);
    }

    @DeleteMapping("/strategy/{id}")
    public void deleteStrategy(@PathVariable("id") String id) {

        strategyRepository.deleteById(id);
    }


}
