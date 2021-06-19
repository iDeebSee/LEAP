package ap.be.backend.controllers;

import ap.be.backend.repositories.ApplicationRepository;
import ap.be.backend.models.Application;
import ap.be.backend.models.TIMEValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("applications")
@RestController
public class ApplicationsController {
    
    @Autowired
    private ApplicationRepository applicationRepository;
    /**
     * Itereert over elke applicatie in de repository.
     * @return Geeft alle applicaties terug.
     */
    @GetMapping("/")
    public Iterable<Application> readApplication() {
        return applicationRepository.findAll();
    }
    /**
     * @return geeft alle tijdwaarden terug.
     */
    @GetMapping("/timevalue")
    public TIMEValue[] getTimeValue() {
        return TIMEValue.values();
    }

    /**
     * @param id id die wordt gebruikt om een specifieke applicatie te vinden.
     * @return geeft de specifieke applicatie terug.
     */
    @GetMapping("/{id}")
    public Application readApplication(@PathVariable("id") String id) {
        return applicationRepository.findById(id).orElseThrow(RuntimeException::new);
    }

     /**
      * @return maakt een nieuwe applicatie aan en slaat het op.
      */
    @PostMapping("/")
    public Application createCapability(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

     /**
      * @return wijzigt een applicatie en slaat het op.
      */
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

     /**
      * Verwijdert een specifieke applicatie uit de repository.
      * @param id manier waarop een specifieke applicatie wordt geselecteerd.
      */
    @DeleteMapping("/{id}")
    public void deleteCapability(@PathVariable("id") String id) {
        applicationRepository.deleteById(id);
    }

     /**
      * Dit dient om alle applicaties te verwijderen.
      */
    @DeleteMapping("/")
    public void deleteAll() {
        applicationRepository.deleteAll();
    }

}
