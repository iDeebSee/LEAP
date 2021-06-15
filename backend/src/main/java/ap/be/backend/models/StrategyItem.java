package ap.be.backend.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StrategyItem")
public class StrategyItem {
    
    @Id
    private String id;

    private String name;

    
    
        
    

    

    public StrategyItem() {}

    /**
     * @param name the name of the capability.
    
     */
    public StrategyItem(String name) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        
        
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

   
    

    
    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();

        builder.append("\n\nStrategyItem:{ \nname=").append(this.name)
       
        .append("}\n");
        return builder.toString();
    }
}

