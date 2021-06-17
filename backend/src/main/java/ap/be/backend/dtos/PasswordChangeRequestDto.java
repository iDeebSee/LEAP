package ap.be.backend.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class PasswordChangeRequestDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 3)
    private String name;
}
