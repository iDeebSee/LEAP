package ap.be.backend.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Strategies")
public class Strategy {
    @Id
    private String id;
    private String name;
    
    public Strategy(){}
    /**
     * @param name of the strategy
     */
    

    public Strategy(String name){
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
        return "Strategy:"+"\nname= "+this.name;
    }

}
