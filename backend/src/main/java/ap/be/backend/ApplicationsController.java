package ap.be.backend;

import ap.be.backend.models.Application;
import ap.be.backend.models.TIMEValue;
import ap.be.backend.repositories.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("applications")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApplicationsController {
    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping("/")
    public Iterable<Application> readApplication() {
        return applicationRepository.findAll();
    }

    @GetMapping("/timevalue")
    public TIMEValue[] getTimeValue(){
        return TIMEValue.values();
    }

    @GetMapping("/{id}")
    public Application readApplication(@PathVariable("id") String id) {
        return applicationRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/")
    public Application createCapability(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @PutMapping("/{id}")
    public Application updateCapability(@PathVariable("id") String id, @RequestBody Application newApplication) {
        Application application = applicationRepository.findById(id).orElseThrow(RuntimeException::new);
        application.setName(newApplication.getName());
        application.setAcquisitionDate(newApplication.getAcquisitionDate());
        application.setVersion(newApplication.getVersion());
        application.setTechnology(newApplication.getTechnology());
        application.setEndOfLife(newApplication.getEndOfLife());
        application.setCurrentPerformance(newApplication.getCurrentPerformance());
        application.setExpectedPerformance(newApplication.getExpectedPerformance());
        application.setCurrentScalability(newApplication.getCurrentScalability());
        application.setExpectedScalability(newApplication.getExpectedScalability());
        application.setCurrentSecurityLevel(newApplication.getCurrentSecurityLevel());
        application.setExpectedSecurityLevel(newApplication.getExpectedSecurityLevel());
        application.setCurrentStability(newApplication.getCurrentStability());
        application.setExpectedStability(newApplication.getExpectedStability());
        application.setCurrentSecurityLevel(newApplication.getCurrentSecurityLevel());
        application.setExpectedSecurityLevel(newApplication.getExpectedSecurityLevel());
        application.setCurrentTotalCostPerYear(newApplication.getCurrentTotalCostPerYear());
        application.setToleratedTotalCostPerYear(newApplication.getToleratedTotalCostPerYear());
        application.setCurrentValueForMoney(newApplication.getCurrentValueForMoney());
        application.setCostCurrency(newApplication.getCostCurrency());
        application.setImportance(newApplication.getImportance());
        application.setEfficiencySupport(newApplication.getEfficiencySupport());
        application.setFunctionalCoverage(newApplication.getFunctionalCoverage());
        application.setBfCorrectness(newApplication.getBfCorrectness());
        application.setFuturePotential(newApplication.getFuturePotential());
        application.setCompleteness(newApplication.getCompleteness());
        application.setIqCorrectness(newApplication.getIqCorrectness());
        application.setAvailability(newApplication.getAvailability());
        return applicationRepository.save(application);
    }

    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") String id) {
        applicationRepository.deleteById(id);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        applicationRepository.deleteAll();
    }

}


