package ap.be.backend.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Capability {
    
    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private int level = 1;

    @Column
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
