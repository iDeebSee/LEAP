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

@ToString
@EqualsAndHashCode
@NoArgsConstructor
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
     * @param name de naam van de nieuwe user, moet uniek zijn. Minimum 3 letters.
     * @param email het email van de nieuwe user, moet uniek en well formed zijn.
     * @param password het wachtwoord van de nieuwe user. Minimum 8 letters, wordt geëncrypteerd in de database.
     */
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
