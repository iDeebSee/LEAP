package ap.be.backend.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class PasswordChangeDto {

    @NotBlank
    private String token;

    @NotBlank
    @Size(min = 8)
    private String password;
}
