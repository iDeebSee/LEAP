package ap.be.backend.models;

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

    /**
     * @param name the name of the environment.
     */
    public Environment(String name) {
        this.name = name;
    }
}

