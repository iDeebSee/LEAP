package ap.be.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import ap.be.backend.dtos.CapabilityMapDto;
import ap.be.backend.models.Capability;
import ap.be.backend.repositories.CapabilityRepository;
import ch.qos.logback.core.joran.conditional.ThenAction;

public class CapabilityMapper {
    private CapabilityRepository capabilityRepository;
    List<Capability> capabilities=capabilityRepository.findAll();
    
    List<Capability> lvl1Capability = new ArrayList<Capability>();
    List<Capability> lvl2Capability = new ArrayList<Capability>();
    List<Capability> lvl3Capability = new ArrayList<Capability>();

public void  DistributeCapabilities(){
    for (int i = 0; i <= capabilities.size(); i++) {
        if (capabilities.get(i).getParent()==null) {
            lvl1Capability.add(capabilities.get(i));
            
        }
        else if (capabilities.get(i).getParent().getParent()!=null) {
            lvl2Capability.add(capabilities.get(i));
            
        }
        else{
            lvl3Capability.add(capabilities.get(i));
        }
     
    }
}






}
