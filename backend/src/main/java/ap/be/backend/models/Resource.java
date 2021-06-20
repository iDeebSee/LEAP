package ap.be.backend.models;

import com.mongodb.lang.NonNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;


/** 
 * @return String
 */
@ToString

/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return String
 */
@Getter 
@Setter
@NoArgsConstructor
@Document(collection="Resources")
public class Resource{

    @Id
    private String id;
    private String name;
    private String description;
    @DBRef
    private List<Capability> linkedCapabilities = new ArrayList<Capability>();
    @DBRef
    private Environment environment;

    public Resource(@NonNull String name, @NonNull String description){
        this.name = name;
        this.description = description;
    }
}