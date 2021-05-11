package ap.be.backend.models;

//import com.fasterxml.jackson.annotation.JsonInclude;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Capabilities")
public class Capability {
    
    @Id
    private String id;

    private String name;

    private String description;

    private int level = 1;

    private Capability parent = null;

    public Capability() {}

    /**
     * @param name
     * @param description
     * @param parent
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLevel() {
        return level;
    }

    public Capability getParent() {
        return parent;
    }

    public void setParent(Capability parent) {
        this.parent = parent;
        this.level = parent.getLevel() + 1;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();

        builder.append("\n\nCapability:{ \nname=").append(this.name)
        .append(", \ndescription=").append(this.description)
        .append(", \nlevel=").append(this.level)
        .append(", \nparent=").append(this.parent)
        .append("}\n");
        return builder.toString();
    }
}
