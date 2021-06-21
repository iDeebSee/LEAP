package ap.be.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Document (collection = "Strategies")
public class Strategy {
    @Id
    private String id;

    private String name;

    @DBRef
    private Environment environment;
    
    public Strategy(String name, Environment environment) {
        this.name = name;
        this.environment = environment;
    }
}
