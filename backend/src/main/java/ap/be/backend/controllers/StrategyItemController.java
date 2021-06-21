package ap.be.backend.controllers;

import java.util.ArrayList;
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

import ap.be.backend.dtos.createdtos.StrategyItemCreateDto;
import ap.be.backend.dtos.editdtos.StrategyItemEditDto;
import ap.be.backend.dtos.readdtos.StrategyItemReadDto;
import ap.be.backend.models.Strategy;
import ap.be.backend.models.StrategyItem;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.StrategyItemRepository;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.services.mappers.StrategyItemMapper;

@RestController
@RequestMapping("/strategyItem")
public class StrategyItemController {

    @Autowired
    private StrategyItemRepository strategyItemRepository;

    @Autowired 
    private StrategyRepository strategyRepository;

    @Autowired 
    private StrategyItemMapper strategyItemMapper;

    @GetMapping("/strategyItems/{strategyId}")
    public ResponseEntity<MessageResponse> readStrategies(@PathVariable("strategyId") String strategyId) {
        if(strategyRepository.existsById(strategyId)) {
            List<StrategyItemReadDto> strategyItems = new ArrayList<StrategyItemReadDto>();
            Strategy strategy = strategyRepository.findById(strategyId).get();
            if(strategyItemRepository.existsByStrategy(strategy)) {
                strategyItemRepository.findAllByStrategy(strategy).get().forEach(strategyItem -> {
                    strategyItems.add(strategyItemMapper.convertToReadDto(strategyItem));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all strategy items!", strategyItems));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy by that ID"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readStrategy(@PathVariable("id") String id) {
        if(strategyItemRepository.existsById(id)) {
            StrategyItemReadDto strategyItem = strategyItemMapper.convertToReadDto(strategyItemRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Successfully got strategy item!", strategyItem));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy item by that ID"));
        }
    }

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createStrategy(@Valid @RequestBody StrategyItemCreateDto strategyItemCreateDto) {
        try {
            StrategyItem strategyItem = strategyItemMapper.convertFromCreateDto(strategyItemCreateDto);
            strategyItemRepository.save(strategyItem);
            return ResponseEntity.ok(new MessageResponse("Successfully created new strategy item!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create strategy item"));
        }
    }

    @PutMapping("/")
    public ResponseEntity<MessageResponse> updateStrategy(@Valid @RequestBody StrategyItemEditDto strategyItemEditDto) {
        if(strategyItemRepository.existsById(strategyItemEditDto.getId())) {
            StrategyItem strategyItem = strategyItemMapper.convertFromEditDto(strategyItemEditDto);
            strategyItemRepository.save(strategyItem);
            return ResponseEntity.ok(new MessageResponse("Successfully updated strategy item!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to update strategy item"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteStrategy(@PathVariable("id") String id) {
        if(strategyItemRepository.existsById(id)) {
            strategyItemRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted strategy item"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy item by that ID"));
        }
    }
}
