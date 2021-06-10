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
@EqualsAndHashCode
@NoArgsConstructor
@Getter @Setter
@Document(collection = "Password_Reset_Tokens")
public class PasswordResetToken {

    @Id
    private String id;

    //seconds in a minute, minutes in an hour, hours in a day
    //expiration after 1 day
    //edit final number to change how long the reset token lasts
    private static final int EXPIRATION = (60 * 60 * 24) * 1;

    private String token;

    @DBRef
    private User user;

    @Indexed(expireAfterSeconds = EXPIRATION)
    private Date expiryDate;

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
