package ap.be.backend.dtos;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserCreateDto {

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Email
    private String email;

    private Set<String> roles;
}
