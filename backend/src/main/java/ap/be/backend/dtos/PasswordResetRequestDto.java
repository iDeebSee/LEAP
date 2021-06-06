package ap.be.backend.dtos;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter @Setter
public class PasswordResetRequestDto {
    private String email;

    private String name;
}
