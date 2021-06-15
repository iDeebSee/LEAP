package ap.be.backend.dtos.readdtos;

import java.util.Set;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class UserReadDto {
    
    @NotBlank
    private String id;

    private String name;

    private String email;

    private Set<String> roles;
}
