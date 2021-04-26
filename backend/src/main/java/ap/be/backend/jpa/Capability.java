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
}
