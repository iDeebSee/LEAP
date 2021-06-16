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
@EqualsAndHashCode
@NoArgsConstructor
@Document (collection = "Strategies")
public class Strategy {
    @Id
    private String id;

    private String name;

    @DBRef
    private List<StrategyItem> strategyItems = new ArrayList<StrategyItem>();

    @DBRef
    private Environment environment;
    
    public Strategy(String name){
        this.name = name;
    }
}
