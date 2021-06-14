package ap.be.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "BussinesProces")
public class BussinesProces {
    
    @Id
    private String id;

    private String name;

    private String description;

    

    

   

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     */

    public BussinesProces(String name, String description) throws IllegalArgumentException {
        
        this.name = name;
        this.description = description;
        
    }

    

    
   
}
