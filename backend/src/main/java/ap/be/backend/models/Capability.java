package ap.be.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode

/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return int
 */

/** 
 * @return Capability
 */

/** 
 * @return Environment
 */
@Document(collection = "Capabilities")

/** 
 * @return String
 */
public class Capability {
    

/** 
 * @return boolean
 */

/** 
 * @return boolean
 */

/** 
 * @return int
 */
    @Id
    private String id;

    private String name;

    private String description;

    @Setter(AccessLevel.NONE)
    private int level = 1;

    @DBRef
    @Setter(AccessLevel.NONE)
    private Capability parent = null;

    @DBRef
    private Environment environment;

    /**
     * @param name naam van de capability.
     * @param description beschrijft wat de capability doet binnen het bedrijf.
     * @param parent de parent van dit capability, de capability moet bestaan en kan niet level 3 of lager zijn.
     */
    public Capability(String name, String description, Capability parent, Environment environment) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        this.description = description;
        if(parent != null && parent.getName() != null) {
            this.level = parent.getLevel() + 1;
            this.parent = parent;
        }
        this.environment = environment;
    }
    /**
     * zet de parent en de capability level
     */

    
    /** 
     * @param parent
     */
    public void setParent(Capability parent) {
        this.parent = parent;
        if(parent != null) {
            this.level = parent.getLevel() + 1;
        } else {
            this.level = 1;
        }
    }
}
