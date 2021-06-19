package ap.be.backend.models;

import org.springframework.data.annotation.Id;
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
 * @return RolesEnum
 */
@Getter @Setter
@Document(collection = "Roles")
public class Role {

    @Id
    private String id;

    private RolesEnum name;

    public Role(String name) {
        this.name = RolesEnum.valueOf(name.toUpperCase());
    }
}
