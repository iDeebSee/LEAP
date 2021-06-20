package ap.be.backend.dtos.readdtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class LinkedCapabilityReadDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;
}
