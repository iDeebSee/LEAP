package ap.be.backend.controllers;

import ap.be.backend.dtos.createdtos.ApplicationCreateDto;
import ap.be.backend.dtos.editdtos.ApplicationEditDto;
import ap.be.backend.dtos.readdtos.ApplicationReadDto;
import ap.be.backend.models.Environment;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.ApplicationRepository;
import ap.be.backend.models.Application;
import ap.be.backend.models.TIMEValue;

import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.services.mappers.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/applications")
@RestController
public class ApplicationController {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EnvironmentRepository environmentRepository;

    @Autowired
    private ApplicationMapper applicationMapper;

    @GetMapping("/{envId}")
//    public Iterable<Application> readApplication() {
//        return applicationRepository.findAll();
//    }
    public ResponseEntity<MessageResponse> readApplications(@PathVariable("envId") String envId) {
        try {
            List<ApplicationReadDto> applications = new ArrayList<ApplicationReadDto>();
            Environment environment = environmentRepository.findById(envId).get();
            if (applicationRepository.existsByEnvironment(environment)) {
                applicationRepository.findAllByEnvironment(environment).get().forEach(application -> {
                    applications.add(applicationMapper.convertToReadDto(application));
                });
            }
            return ResponseEntity.ok(new MessageResponse("Successfully got all applications!", applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get applications"));
        }
    }

    @GetMapping("/timevalue")
    public TIMEValue[] getTimeValue() {
        return TIMEValue.values();
    }

    @GetMapping("/{id}")
//    public Application readApplication(@PathVariable("id") String id) {
//        return applicationRepository.findById(id).orElseThrow(RuntimeException::new);
//    }
    public ResponseEntity<MessageResponse> readApplication(@PathVariable("id") String id) {
        if(applicationRepository.existsById(id)) {
            ApplicationReadDto application = applicationMapper.convertToReadDto(applicationRepository.findById(id).get());
            return ResponseEntity.ok(new MessageResponse("Successfully found application", application));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find application with that ID"));
        }
    }

    @PostMapping("/")
//    public Application createCapability(@RequestBody Application application) {
//        return applicationRepository.save(application);
//    }
    public ResponseEntity<MessageResponse> createApplication(@Valid @RequestBody ApplicationCreateDto applicationCreateDto) {
        try {
            Application newApplication = applicationMapper.convertFromCreateDto(applicationCreateDto);
            applicationRepository.save(newApplication);
            return ResponseEntity.ok(new MessageResponse("Successfully created application"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create application"));
        }
    }

    @PutMapping("/{id}")
//    public Application updateCapability(@PathVariable("id") String id, @RequestBody Application newApplication) {
//        Application application = applicationRepository.findById(id).orElseThrow(RuntimeException::new);
//        application.setName(newApplication.getName());
//        application.setAcquisitionDate(newApplication.getAcquisitionDate());
//        application.setVersion(newApplication.getVersion());
//        application.setTechnology(newApplication.getTechnology());
//        application.setEndOfLife(newApplication.getEndOfLife());
//        application.setCurrentPerformance(newApplication.getCurrentPerformance());
//        application.setExpectedPerformance(newApplication.getExpectedPerformance());
//        application.setCurrentScalability(newApplication.getCurrentScalability());
//        application.setExpectedScalability(newApplication.getExpectedScalability());
//        application.setCurrentSecurityLevel(newApplication.getCurrentSecurityLevel());
//        application.setExpectedSecurityLevel(newApplication.getExpectedSecurityLevel());
//        application.setCurrentStability(newApplication.getCurrentStability());
//        application.setExpectedStability(newApplication.getExpectedStability());
//        application.setCurrentSecurityLevel(newApplication.getCurrentSecurityLevel());
//        application.setExpectedSecurityLevel(newApplication.getExpectedSecurityLevel());
//        application.setCurrentTotalCostPerYear(newApplication.getCurrentTotalCostPerYear());
//        application.setToleratedTotalCostPerYear(newApplication.getToleratedTotalCostPerYear());
//        application.setCurrentValueForMoney(newApplication.getCurrentValueForMoney());
//        application.setCostCurrency(newApplication.getCostCurrency());
//        application.setImportance(newApplication.getImportance());
//        application.setEfficiencySupport(newApplication.getEfficiencySupport());
//        application.setFunctionalCoverage(newApplication.getFunctionalCoverage());
//        application.setBfCorrectness(newApplication.getBfCorrectness());
//        application.setFuturePotential(newApplication.getFuturePotential());
//        application.setCompleteness(newApplication.getCompleteness());
//        application.setIqCorrectness(newApplication.getIqCorrectness());
//        application.setAvailability(newApplication.getAvailability());
//        return applicationRepository.save(application);
//    }
    public ResponseEntity<MessageResponse> updateApplication(@Valid @RequestBody ApplicationEditDto applicationEditDto) {
        if(applicationRepository.existsById(applicationEditDto.getId())) {
            Application updatedApplication = applicationMapper.convertFromEditDto(applicationEditDto);
            applicationRepository.save(updatedApplication);
            return ResponseEntity.ok(new MessageResponse("Successfully updated application"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find application with that ID"));
        }
    }

    @DeleteMapping("/{id}")
//    public void deleteCapability(@PathVariable("id") String id) {
//        applicationRepository.deleteById(id);
//    }
    public ResponseEntity<MessageResponse> deleteApplication(@PathVariable("id") String id) {
        if(applicationRepository.existsById(id)) {
            applicationRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted application"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find application with that ID"));
        }
    }

    @DeleteMapping("/")
    public void deleteAll() {
        applicationRepository.deleteAll();
    }

}
