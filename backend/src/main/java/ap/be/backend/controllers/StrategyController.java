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

import ap.be.backend.dtos.createdtos.StrategyCreateDto;
import ap.be.backend.dtos.editdtos.StrategyEditDto;
import ap.be.backend.dtos.readdtos.StrategyReadDto;
import ap.be.backend.models.Environment;
import ap.be.backend.models.Strategy;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.services.mappers.StrategyMapper;

@RestController
@RequestMapping("/strategy")
public class StrategyController {

    @Autowired
    private StrategyRepository strategyRepository;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired 
    private StrategyMapper strategyMapper;

    @GetMapping("/strategies/{envId}")
    public ResponseEntity<MessageResponse> readStrategies(@PathVariable("envId") String envId) {
        try {
            List<StrategyReadDto> strategies = new ArrayList<StrategyReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if(strategyRepository.existsByEnvironment(environment)) {
                strategyRepository.findAllByEnvironment(environment).get().forEach(strategy -> {
                    strategies.add(strategyMapper.convertToReadDto(strategy));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all strategies!", strategies));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get strategies"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readStrategy(@PathVariable("id") String id) {
        if(strategyRepository.existsById(id)) {
            StrategyReadDto strategy = strategyMapper.convertToReadDto(strategyRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Successfully found strategy", strategy));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createStrategy(@Valid @RequestBody StrategyCreateDto strategyCreateDto) {
        try {
            Strategy newStrategy = strategyMapper.convertFromCreateDto(strategyCreateDto);
            strategyRepository.save(newStrategy);
            return ResponseEntity.ok(new MessageResponse("Successfully created strategy"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create strategy"));
        }
    }

    @PutMapping("/")
    public ResponseEntity<MessageResponse> updStrategy(@Valid @RequestBody StrategyEditDto strategyEditDto) {
        if(strategyRepository.existsById(strategyEditDto.getId())) {
            Strategy updatedStrategy = strategyMapper.convertFromEditDto(strategyEditDto);
            strategyRepository.save(updatedStrategy);
            return ResponseEntity.ok(new MessageResponse("Successfully updated strategy"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteStrategy(@PathVariable("id") String id) {
        if(strategyRepository.existsById(id)) {
            strategyRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted strategy"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }
}
