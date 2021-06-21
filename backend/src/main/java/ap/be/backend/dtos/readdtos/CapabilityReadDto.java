package ap.be.backend.dtos.readdtos;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class CapabilityReadDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @Min(value = 1) 
    @Max(value = 3)
    private int level;

    private String parent;

    @NotBlank
    private String environment;
}
