package ap.be.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
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

@RestController
@RequestMapping("/strategy")
public class StrategyController {

    @Autowired
    private StrategyRepository strategyRepository;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired 
    private ModelMapper modelMapper;

    @GetMapping("/strategies/{envId}")
    public ResponseEntity<MessageResponse> readStrategies(@PathVariable("envId") String envId) {
        try {
            List<StrategyReadDto> strategies = new ArrayList<StrategyReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if(environment.getStrategies().size() > 0) {
                environment.getStrategies().forEach(strategy -> {
                    strategies.add(modelMapper.map(strategy, StrategyReadDto.class));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all strategies!", strategies));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get strategies"));
        }
    }

    @GetMapping("/{envId}/{id}")
    public ResponseEntity<MessageResponse> readStrategy(@PathVariable("envId") String envId, @PathVariable("id") String id) {
        if(environmentRepository.existsById(envId)) {
            Environment environment = environmentRepository.findById(envId).get();
            StrategyReadDto strategy = modelMapper.map(environment.findStrategyById(id), StrategyReadDto.class);
            return ResponseEntity.ok(new MessageResponse("Successfully found strategy", strategy));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }

    @PostMapping("/{envId}")
    public ResponseEntity<MessageResponse> createStrategy(@PathVariable("envId") String envId, @RequestBody StrategyCreateDto newStrategyDto) {
        try {
            Strategy newStrategy = modelMapper.map(newStrategyDto, Strategy.class);
            strategyRepository.save(newStrategy);
            return ResponseEntity.ok(new MessageResponse("Successfully created strategy"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create strategy"));
        }
    }

    @PutMapping("/{envId}/{id}")
    public ResponseEntity<MessageResponse> updStrategy(@PathVariable("envId") String envId, @PathVariable("id") String id, @RequestBody StrategyEditDto updatedStrategyDto) {
        if(strategyRepository.existsById(id)) {
            Strategy updatedStrategy = modelMapper.map(updatedStrategyDto, Strategy.class);
            updatedStrategy.setId(id);
            strategyRepository.save(updatedStrategy);
            return ResponseEntity.ok(new MessageResponse("Successfully updated strategy"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }

    @DeleteMapping("/{envId}/{id}")
    public ResponseEntity<MessageResponse> deleteStrategy(@PathVariable("envId") String envId, @PathVariable("id") String id) {
        if(strategyRepository.existsById(id)) {
            strategyRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted strategy"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find strategy with that ID"));
        }
    }
}
