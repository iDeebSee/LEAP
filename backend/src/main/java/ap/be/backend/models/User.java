package ap.be.backend.models;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


/** 
 * @return String
 */
@ToString

/** 
 * @return boolean
 */

/** 
 * @return boolean
 */

/** 
 * @return int
 */
@EqualsAndHashCode
@NoArgsConstructor

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
 * @return String
 */

/** 
 * @return Set<Role>
 */
@Getter @Setter
@Document(collection = "Users")
public class User {
    
    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<Role>();

    /**
     * 
     * @param name the name of the new user, has to be unique. Minimum of 3 letters
     * @param email the email of the new user, has to be well formed and unique
     * @param password the password of the new user. Minimum of 8 letters, encrypted in the database
     */
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
