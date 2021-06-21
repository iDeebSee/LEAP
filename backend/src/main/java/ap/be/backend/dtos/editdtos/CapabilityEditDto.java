package ap.be.backend.dtos.editdtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class CapabilityEditDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private String parent;

    @NotBlank
    private String environment;
}
