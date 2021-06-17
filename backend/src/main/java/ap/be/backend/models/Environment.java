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

    /**
     * @param name de naam van de environment.
     * @param description beschrijft het bedrijf waarvoor de gebruiker objecten zal creëren.
     */
    public Environment(String name, String description) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        this.description = description;   
    }
}

