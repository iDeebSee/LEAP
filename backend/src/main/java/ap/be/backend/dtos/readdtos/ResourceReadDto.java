package ap.be.backend.dtos.readdtos;

import java.util.List;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.core.env.Environment;

@Data
@ToString
@EqualsAndHashCode
public class ResourceReadDto {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private List<LinkedCapabilityReadDto> linkedCapabilities;

    @NotBlank
    private Environment environment;
}
