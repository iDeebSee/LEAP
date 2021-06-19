package ap.be.backend.dtos;

import java.util.Set;

import ap.be.backend.models.Capability;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CapabilityMapDto {

    private Capability lvl1Capability;

    private Capability lvl2Capability;

    private Capability lvl3Capability;
    

    private Set<String> Capabilities;
}
