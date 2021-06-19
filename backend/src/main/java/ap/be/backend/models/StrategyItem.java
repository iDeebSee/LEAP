package ap.be.backend.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Document(collection = "StrategyItem")
public class StrategyItem {
    
    @Id
    private String id;

    private String name;

    @DBRef
    private Strategy strategy;

    @DBRef
    private List<Capability> linkedCapabilities = new ArrayList<Capability>();
    /**
     * @param name the name of the capability.
     */
    public StrategyItem(String name, Strategy strategy) throws IllegalArgumentException {
        this.name = name;
        this.strategy = strategy;
    }
}

