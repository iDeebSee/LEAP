package ap.be.backend.dtos;

import java.util.Set;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter @Setter
public class UserDto {
    
    private String id;

    private String name;

    private String email;

    private Set<String> roles;
}
