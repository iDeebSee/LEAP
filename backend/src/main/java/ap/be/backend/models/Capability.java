package ap.be.backend.models;

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

    public Capability(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Capability(String name, String description, Capability parent) {
        this(name, description);
        this.level = parent.getLevel() + 1;
        this.parent = parent;
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
}
