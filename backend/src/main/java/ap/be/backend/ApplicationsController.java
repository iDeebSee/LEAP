package ap.be.backend;

import ap.be.backend.Repositories.ApplicationRepository;
import ap.be.backend.models.Application;
import ap.be.backend.models.TIMEValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("application")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApplicationsController {
    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping
    public Iterable<Application> readApplication() {
        return applicationRepository.findAll();
    }

    @GetMapping("/timevalue")
    public TIMEValue[] getTimeValue(){
        return TIMEValue.values();
    }

    @GetMapping("/{name}")
    public Application readApplication(@PathVariable("name") String name) {
        return applicationRepository.findByName(name);
    }

    @PostMapping("/add")
    public Application createCapability(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @PutMapping("/{name}")
    public Application updateCapability(@PathVariable("name") String name, @RequestBody Application newApplication) {
        Application application = applicationRepository.findByName(name);
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
        return applicationRepository.save(application);
    }

    @DeleteMapping("/{name}")
    public void deleteCapability(@PathVariable("name") String name) {
        applicationRepository.deleteByName(name);
    }

    @DeleteMapping("/")
    public void deleteAll() {
        applicationRepository.deleteAll();
    }

}

