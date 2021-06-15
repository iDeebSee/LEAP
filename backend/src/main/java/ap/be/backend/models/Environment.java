package ap.be.backend.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString


@Document(collection = "Environments")
public class Environment {
    
    @Id
    private String id;

    private String name;

    private String description;
    
    private ArrayList<String> capabityList= new ArrayList<>();
        
    

    

    

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     * @param capabiltyList is een lijst van capabilties binnen die environment
     */
    public Environment(String name, String description, ArrayList<String> capLIst ) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        this.description = description;
        this.capabityList=capLIst;
        
        }
    

    
    
    
}

