package ap.be.backend.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Document(collection = "Environments")
public class Environment {
    
    @Id
    private String id;

    private String name;

    private String description;
    
    private List<Capability> capabilityList = new ArrayList<Capability>();

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     */
    public Environment(String name, String description) {
        this.name = name;
        this.description = description;
    }

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     * @param capabiltyList is een lijst van capabilties binnen die environment
     */
    public Environment(String name, String description, List<Capability> capabilityList ) throws IllegalArgumentException {
        this(name, description);
        this.capabilityList = capabilityList;

    }

    public void AddCapabilty(Capability capability){
        capabilityList.add(capability);
    }

    public Capability findById(String capId) {
        Capability output = 
        capabilityList.stream()
            .filter(capability -> capability.getId().equals(capId))
            .findFirst()
            .orElse(null);
        return output;
    }

    public void editCapability(Capability capability) {
        capabilityList.set(capabilityList.indexOf(findById(capability.getId())), capability);
    }

    public void DeleteCapability(Capability capability){
        capabilityList.remove(capability);
    }
}

