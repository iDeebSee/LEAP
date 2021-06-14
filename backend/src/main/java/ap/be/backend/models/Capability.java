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
@Document(collection = "Capabilities")
public class Capability {
    
    @Id
    private String id;

    private String name;

    private String description;

    @Setter(AccessLevel.NONE)
    private int level = 1;

    @DBRef
    @Setter(AccessLevel.NONE)
    private Capability parent = null;

    /**
     * @param name the name of the capability.
     * @param description describes what the capability does within the business.
     * @param parent the parent of this capability, has to be an existing capability and cannot be level 3 or lower.
     */
    public Capability(String name, String description, Capability parent) throws IllegalArgumentException {
        //this(name, description);
        this.name = name;
        this.description = description;
        if(parent != null && parent.getName() != null) {
            this.level = parent.getLevel() + 1;
            this.parent = parent;
        }
    }

    public void setParent(Capability parent) {
        this.parent = parent;
        if(parent != null) {
            this.level = parent.getLevel() + 1;
        } else {
            this.level = 1;
        }
    }
}
