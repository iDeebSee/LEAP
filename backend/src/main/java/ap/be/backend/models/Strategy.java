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
     * Constructor of strategy.
     * @param name
     */
    public Strategy(String name){
        this.name = name;
    }
    /**
     * Evokes the id of a strategy.
     * @return id
     */
    public String getId() {
        return id;
    }
    /**
     * Edits the current id.
     * @param id
    */
    public void setId(String id) {
        this.id = id;
    }
    /**
    * Evokes the name of a strategy.
    * @return name
    */
    public String getName() {
        return name;
    }
    /**
     * Edits the current name.
     * @param name
    */
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Strategy:"+"\nname= "+this.name;
    }

}
