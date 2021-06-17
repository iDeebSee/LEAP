package ap.be.backend.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Getter @Setter
@Document(collection = "Password_create_tokens")
public class PasswordCreateToken {
    
    @Id
    private String id;

    //seconds in a minute, minutes in an hour, hours in a day
    //expiration after 1 day
    //edit final number to change how long the reset token lasts
    private static final int EXPIRATION = (60 * 60 * 24) * 3;

    private String token;

    @DBRef
    private User user;

    @Indexed(expireAfterSeconds = EXPIRATION)
    private Date expiryDate;
    /**
     * @param token token voor de houdbaarheid van de aanmaak van de wachtwoord
     * @param user gebruiker meesturen
     */

    public PasswordCreateToken(String token, User user) {
        this.token = token;
        this.user = user;    
    }
}
