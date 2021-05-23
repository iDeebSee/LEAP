package ap.be.backend.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Envirement")
public class Environment {
    
    @Id
    private String id;

    private String name;

    private String description;
    
        
    

    

    public Environment() {}

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     */
    public Environment(String name, String description) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        this.description = description;
        
        }
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    

    
    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();

        builder.append("\n\nEnvironment:{ \nname=").append(this.name)
        .append(", \ndescription=").append(this.description)
        .append("}\n");
        return builder.toString();
    }
}

