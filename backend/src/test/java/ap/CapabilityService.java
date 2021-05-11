package ap;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ap.be.backend.Repositories.CapabilityRepository;
import ap.be.backend.models.Capability;

@Service
@Transactional
public class CapabilityService {

    private final CapabilityRepository capabilityRepository;

    @Autowired
    public CapabilityService(CapabilityRepository capabilityRepository){
        this.capabilityRepository = capabilityRepository;
    }

    public List<Capability> findAllCapabilities() {
        return capabilityRepository.findAll();
    }

    public Optional<Capability> findCapabilityById(String id) {
        return capabilityRepository.findById(id);
    }

    public Capability updateCapability(Capability capability) {
        return capabilityRepository.save(capability);
    }
    public void deleteCapabilityById(String id) {
        capabilityRepository.deleteById(id);
    }

    public void deleteAllCapabilities(){
         capabilityRepository.deleteAll();
    }

    public Capability addCapability(Capability capability) {
        return capabilityRepository.save(capability);
    }

    
}
