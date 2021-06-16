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
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.models.StrategyItem;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.StrategyItemRepository;

@RestController
public class StrategyItemController {

    @Autowired
    private StrategyItemRepository strategyItemRepository;

    @GetMapping("/strategyItem")
    public Iterable<StrategyItem> readStrategies() {
        return strategyItemRepository.findAll();
    }

    @GetMapping("/strategyItem/{id}")
    public StrategyItem readStrategy(@PathVariable("id") String id) {
        return strategyItemRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/strategyItem")
    public StrategyItem createStrategy(@RequestBody LinkedHashMap<Object, Object> data) {
        System.out.println(data);
        StrategyItem newStrategyItem = new StrategyItem();

        newStrategyItem.setName(data.get("name").toString());
        return strategyItemRepository.save(newStrategyItem);
    }

    @PutMapping("/strategyItem/{id}")
    public StrategyItem updStrategy(@PathVariable("id") String id, @RequestBody StrategyItem newStrategyItem) {
        StrategyItem strategy = strategyItemRepository.findById(id).orElseThrow(RuntimeException::new);
        if(!newStrategyItem.getName().isBlank())
            strategy.setName(newStrategyItem.getName());
        return strategyItemRepository.save(strategy);
    }

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
